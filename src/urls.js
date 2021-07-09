// const base = process.env.REACT_APP_API;
const base = "https://riczer-blog-api.herokuapp.com/api";
// const base = "http://127.0.0.1:8000/api";
console.log(base);

const urls = {
  user: `${base}/user`,
  post: `${base}/post`,
  login: `${base}/auth/login`,
};

export default urls;
