import api from 'api';
import { normalize } from 'normalizr';

export default store => {
  return next => action => {
    const { apiCall, type, ...rest } = action;

    if (!apiCall) return next(action);
    const state = store.getState();
    const {
      apiMethod,
      method,
      checkCache,
      url,
    } = apiCall;
    if (checkCache) {
      const cachedResponse = checkCache(apiCall.data, state);
      if (cachedResponse) {
        return new Promise((resolve) => {
          resolve(cachedResponse);
        }).then(response => {
          next({ ...rest, ...response, type });
          return {
            error: false,
            response,
          };
        }).catch(res => {
          next({ ...rest, res, type: `${ type }/fail` });
          return {
            error: 'unknown',
          };
        });
      }
    }

    next({ ...rest, type: `${ type }/request` });
    return api[apiMethod || 'post'](url, { method, data: apiCall.data || {} })
      .then(res => {
        const { data } = res;
        if (apiCall.schema) {
          const normalizedData = normalize(data, apiCall.schema);
          next({ ...rest, entities: normalizedData.entities, type });
          return {
            error: false,
            ...normalizedData,
          };
        }

        next({ ...rest, data, type });
        return {
          error: false,
          ...data,
        };
      })
      .catch(res => {
        next({ ...rest, res, type: `${ type }/fail` });
        return {
          error: res.error || true,
        };
      });
  };
};
