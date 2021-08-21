import Request from "./request";
//添加文章
export function tagsCreate(params) {
  return Request.post("/addTags", params);
}

//获取文章
export function getTagsList(params) {
  return Request.get("/getTagsList", params);
}



//根据id修改文章
export function updateTagsById(params) {
  return Request.put("/updateTagsById", params);
}


//根据id删除文章
export function deleteTagsById(params) {
  return Request.delete("/deleteTagsById", { data: params });
}