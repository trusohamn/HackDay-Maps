
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
        API_URL: 'http://localhost:8000'
    },
    app_id: {
      FACEBOOK_APPID: '547631249107961'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev: prod;