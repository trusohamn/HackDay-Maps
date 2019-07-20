
const prod = {
    url: {
        API_URL: 'https://db-truso-map-space.herokuapp.com'
    },
    app_id: {
      FACEBOOK_APPID: '383464965621720'
    }
};
const dev = {
    url: {
        API_URL: 'http://127.0.0.1:8000'
    },
    app_id: {
      FACEBOOK_APPID: '2626879837323699'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev: prod;