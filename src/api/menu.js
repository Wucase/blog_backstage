import Request from "./request";
//添加文章
export function menuCreate(params) {
  return Request.post("/addMenu", params);
}

//获取文章
export function getMenuList(params) {
  return Request.get("/getMenuList", params);
}



//根据id修改文章
export function updateMenuById(params) {
  return Request.put("/updateMenuById", params);
}


//根据id删除文章
export function deleteArticleById(params) {
  return Request.delete("/deleteArticleById", { data: params });
}