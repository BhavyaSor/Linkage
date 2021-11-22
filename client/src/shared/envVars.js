export const ENV = process.env.REACT_APP_ENV;
export const apiUrl =
  ENV === 'DEVELOPMENT'
    ? 'http://localhost:8000'
    : process.env.REACT_APP_PROD_API_URL;
