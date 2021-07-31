import Request from "./request";
//添加文章
export function classfityCreate(params) {
  return Request.post("/addClassfity", params);
}

//获取文章
export function getClassfityList(params) {
  return Request.get("/getClassfityList", params);
}



//根据id修改文章
export function updateClassfityById(params) {
  return Request.put("/updateClassfityById", params);
}

//根据id获取文章
export function getArticleById(params) {
  return Request.get("/getArticleById", params);
}
//根据id删除文章
export function deleteArticleById(params) {
  return Request.delete("/deleteArticleById", { data: params });
}