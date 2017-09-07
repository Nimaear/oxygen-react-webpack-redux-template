import axios from 'axios';
import config from '../config';

const { host, route, protocol } = config.api;

const API_URL = `${ protocol }://${ host }/${ route }`;

class API {
  constructor() {
    this.session = null;
    this.axios = axios.create({
      baseURL: API_URL,
      timeout: 3000,
    });

    this.get = this.createMethod('get');
    this.delete = this.createMethod('delete');
    this.put = this.createMethod('put');
    this.post = this.createMethod('post');
  }

  setSession(session) {
    this.session = session;
  }

  setToken(token) {
    this.axios.defaults.headers.common.Token = token;
    if (this.session) {
      this.session.token = token;
    }
  }

  auth(url, data) {
    return new Promise((resolve, reject) => {
      this.axios.post(url, data).then(res => {
        const { data } = res;
        this.setToken(data.data.sessionId);
        resolve(data);
      })
      .catch(res => {
        reject({
          res,
        });
      });
    });
  }

  logout(url, data) {
    return new Promise((resolve, reject) => {
      this.axios.post(url, data).then(res => {
        this.axios.post('auth', { method: 'status' }).then(res => {
          const { data } = res;
          this.setToken(data.data.sessionId);
          resolve(data);
        });
      })
      .catch(res => {
        reject({
          res,
        });
      });
    });
  }

  createMethod(method) {
    return (url, data) => {
      return new Promise((resolve, reject) => {
        this.axios[method](url, data).then(res => {
          const { data } = res;
          resolve(data);
        })
        .catch(res => {
          reject({
            res,
          });
        });
      });
    };
  }

}

const api = new API();

export default api;
