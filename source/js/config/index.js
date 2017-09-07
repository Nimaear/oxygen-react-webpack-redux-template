const config = {
  development: {
    assetsLocation: '/assets',
    api: {
      protocol: 'https',
      version: 'v2',
      host: 't-api.s.coursio.com',
      route: 'api',
    },
  },
  test: {
    assetsLocation: '/assets',
    api: {
      protocol: 'https',
      version: 'v2',
      host: 't-api.s.coursio.com',
      route: 'api',
    },
  },
  acceptance: {
    assetsLocation: '/assets',
    api: {
      protocol: 'https',
      version: 'v2',
      host: 't-api.s.coursio.com',
      route: 'api',
    },
  },
  production: {
    assetsLocation: '/assets',
    api: {
      protocol: 'https',
      version: 'v2',
      host: 't-api.s.coursio.com',
      route: 'api',
    },
  },
};

const currentConfig = config[process.env.NODE_ENV || 'development'];

export default currentConfig;
