// import store from "@/store/index";
// import { MessageBox } from "element-ui";
import router from "@/router";
import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
axios.defaults.timeout = 12000; // 请求超时时间
// axios.withCredentials = true;
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization

/** 区分打包环境与开发环境
 * process.env.NODE_ENV==='production'  (打包环境)
 * process.env.NODE_ENV==='development' (开发环境)
 */

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://www.wwming.xyz:3030/api' : "http://www.wwming.xyz:3030/api";
// axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'http://1.14.157.140:3030/api':"http://1.14.157.140:3030/api";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8"; // post请求头的设置
//设置跨域访问

axios.interceptors.request.use(
  (config) => {
    if (
      config.path != "/api/login" &&
      config.path != "/register" &&
      window.sessionStorage.getItem("Token")
    ) {
      config.headers.Token = window.sessionStorage.getItem("Token");
      return config;
    }

    return config;
  },
  (error) => {
    return error;
  }
);

axios.interceptors.response.use(
  (config) => {
    console.log(config);
    if (config.data.meta.status == 403) {
      router.push("/login");
      Message.error("登录已过期,请重新登录");
      store.commit('resetUser')
      window.sessionStorage.clear()
      return false;
    }
    return config;
  },
  (error) => {
    return new Promise().reject(error);
  }
);

class http {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.data));
    });
  }

  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  put(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, params)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, params)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}
export default new http();
