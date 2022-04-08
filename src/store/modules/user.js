
// state设置变量
// actions 异步-得到结果 - mutations 操作数据-getters监听数据变动
// 最后返回的是监听数据变动
import { getMenuList } from "@/api/menu";
export default {
    // namespaced: true, // 是否开启命名空间
    // data 存储数据
    state: {
        userInfo: {},
        token:'',
        userId:'',
        userName:'',
      showLogin: false,
      lastRoute: '/',

    },
    // 异步
    actions: {
        GetUserInfo({ commit, state },type) {
            return new Promise((resolve, reject) => {
                let params = {
                    menuType: type,
                    pageSize: 9999,
                    pageNum: 1,
                    menuStatus: 1
                };
                getMenuList(params).then((res) => {
                    console.log(">>>>>>>>>", res.data)
                    if (res.meta.status === 200) {
                        commit.setUser(res.data.docs)
                        resolve(res.data.docs);
                    }
                }).catch(err => {
                    reject(err)
                });
            })
        },
      setTokenAction(context,token){
        context.commit('setToken', token)
      },
      setUserIdAction(context,id){
        context.commit('setUserId', id)
      },
      resetUserAction(context){
        context.commit('resetUser')
      }
    },
    //  操控 state 里面的数据的   methods
    mutations: {
        setShowLogin(state, showLogin) {
            state.showLogin = showLogin
        },
      setLastRoute(state, lastRoute) {
            state.lastRoute = lastRoute
        },
      setUserName(state, userName) {
            state.userName = userName
        },
      setUser(state, userInfo) {
            state.userInfo = userInfo
        },
        setToken(state, token) {
            state.token = token
        },
        setUserId(state, id){
            state.userId = id
        },
        resetUser(state){
            console.log("reset---------");
            state.userId = ''
            state.token = ''
            state.userInfo = {}

        },

    },
    // Getters 可以用于监听、state中的值的变
    getters: {
        userInfo: state => {
            return state.userInfo
        },
      lastRoute: state => {
            return state.lastRoute
        },
      userName: state => {
            return state.userName
        },
      showLogin: state => {
            return state.showLogin
        },
        getToken: state => {
            return state.token
        },
        getUserId: state => {
            return state.adminMenu
        },
    },
}
