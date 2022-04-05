const dev = {
    api: {
      recipesUrl: "http://localhost:3080/recipes/",
    },
  };
  
  const prod = {
    api: {
      recipesUrl: "live url",
    },
  };
  
  const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;
  
  export default {
    ...config
  };