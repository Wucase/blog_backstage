import { getMenuList } from "@/api/menu";
export const getMenuListFun = (type) => {
  return new Promise((resolve, reject) => {
    let params = {
      menuType: type,
      pageSize: 9999,
      pageNum: 1,
      menuStatus: 1
    };
    getMenuList(params).then((res) => {
      if (res.meta.status === 200) {
        window.sessionStorage.setItem(type + "Menu", JSON.stringify(res.data.docs))
        resolve(res.data.docs);
      }
    }).catch(err => {
      reject(err)
    });
  })
}