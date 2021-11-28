import Request from "./request";
//添加文章
export function articleCreate(params) {
  return Request.post("/addArticle", params);
}

//获取文章
export function getArticleList(params) {
  return Request.get("/getArticleList", params);
}
//上传文件
export function fileUpload(params) {
  return Request.post("/fileUpload", params);
}
//上传图片
export function imgUpload(params) {
  return Request.post("/imgUpload", params);
}

//根据id修改文章
export function updateArticleById(params) {
  return Request.put("/updateArticleById", params);
}

//根据id获取文章
export function getArticleById(params) {
  return Request.get("/getArticleById", params);
}
//根据id删除文章
export function deleteArticleById(params) {
  return Request.delete("/deleteArticleById", { data: params });
}
//根据id删除文章
export function updateArticleStatusById(params) {
  return Request.put("/updateArticleStatusById", { data: params });
}

//统计
export function getStatisticsCount(params) {
  return Request.get("/getStatisticsCount", { data: params });
}
//hot
export function getArticleHots(params) {
  return Request.get("/getArticleHots", { data: params });
}