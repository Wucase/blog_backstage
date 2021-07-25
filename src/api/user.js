import Request from "./request";

export function userLogin(params) {
  return Request.put("/login", params);
}

export function getCaptcha(params) {
    return Request.get("/captcha", params);
  }