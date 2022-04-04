<template>
  <div class='Login'>
    <div class="login-logo">
      <div class="home-main-bottom">
        <div class="title-show">
          <span class="animated bounceInDown" style="animation-delay: 0.2s;"><i
              class="iconfont icon-W_round_solid icon-title"></i></span>
          <span class="animated bounceInDown" style="animation-delay: 0.5s;"><i
              class="iconfont icon-M_round_solid icon-title"></i></span>
          <span class="animated bounceInDown" style="animation-delay: 0.1s;"><i
              class="iconfont icon-I_round_solid icon-title"></i></span>
          <span class="animated bounceInDown" style="animation-delay: 0.3s;"><i
              class="iconfont icon-N_round_solid icon-title"></i></span>
          <span class="animated bounceInDown" style="animation-delay: 0.4s;"><i
              class="iconfont icon-G_round_solid icon-title"></i></span>

        </div>
        <div class="title-line">
          <div class="line">
          </div>
          <div class="line line2">
          </div>
        </div>

      </div>
    </div>
    <div class="btns">
      <el-button @click="touristTo" class="tour" type="success">游客参观
      </el-button>
      <el-button @click="touristToGit" class="github" size="mini" circle><i class="iconfont icon-github"></i>
      </el-button>
      <el-button @click="toLogin" class="author" type="warning">创作者
      </el-button>
    </div>
    <div class="animated zoomIn managerInfo">
      <ShiMask>
      </ShiMask>
    </div>

    <div v-if="loginDialogVisible">
      <login-form :dialogVisible="loginDialogVisible" @cancel="cancel">
      </login-form>
    </div>
    <div class='footer'>
      Copyright © 2018-2020 beiguyan All Rights Reserved V.0.0.0 备案号: <el-link type="primary" :underline="false"
        @click="toBan">
        粤ICP备2021073416号-1</el-link>
    </div>
  </div>
</template>

<script>
  import ShiMask from "./components/ShiMask.vue";
  import LoginForm from "./components/loginForm.vue";
  import { getMenuListFun } from "@/utils/tools";
  export default {
    name: "Login",
    components: { ShiMask, LoginForm },
    props: {},
    data() {
      return {
        loginDialogVisible: false,
        menuList: []
      };
    },
    mounted() { },
    created() {
      this.getMenuList()
    },
    methods: {
      async getMenuList() {
        let userMenu = JSON.parse(window.sessionStorage.getItem("userMenu"))
        if (userMenu) return
        this.menuList = await getMenuListFun('user')
      },
      touristTo() {
        let p1 = () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log('111111111');
              resolve({ success: 1 })
            }, 1000)
          })
        }
        let p2 = () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log('222222');
              resolve({ error: 1 })
            }, 2000)
          })
        }
        let p3 = () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log('3333333333');
              resolve({ success: 1 })
            }, 3000)
          })
        }

        Promise.all([p1(), p2(), p3()]).then(res => {
          console.log('res===', res);
          let arr = res.map(v => v.error).filter(Boolean)
          console.log('>>>>', arr);
        })
        // this.$router.push("/users");

      },
      touristToGit() { },
      toLogin() {
        this.loginDialogVisible = true;
      },
      cancel() {
        this.loginDialogVisible = false;
      },
      toBan() {
        let tempwindow = window.open('_blank');
        tempwindow.location = 'https://beian.miit.gov.cn/';
      }
    },
  };
</script>

<style lang='scss' scoped>
  .Login {
    width: 100%;
    height: 100% !important;
    background-color: rgb(75, 163, 240);
    overflow: hidden;
    padding-top: 15%;
    box-sizing: border-box;
    position: relative;
    top: 0;
    left: 0;

    .login-logo {
      margin: 0 auto;

      .home-main-bottom {
        /* position: relative;
        top: 0;
        left: 0; */

        .title-show {
          margin: 0 auto;
          text-align: center;

          span {
            display: inline-block;
          }

          .icon-title {
            color: rgb(255, 255, 255);
            font-size: 88px !important;
          }

          width: 100%;
          // background-color: #fff;
        }

        .title-line {
          width: 100%;
          height: 100px;
          display: flex;
          flex-direction: column;

          .line {
            display: inline-block;
            width: 0px;
            height: 2px;
            background-color: #fff;
            margin: 15px auto;
          }

          .line:nth-child(1) {
            width: 600px;
          }

          .line:nth-child(2) {
            animation: line 1s linear 1s forwards;
          }
        }
      }
    }
  }

  .managerInfo {
    width: 100% !important;
    display: inline-block;
    margin: 0 auto;
    text-align: center;
    margin-top: 85px;
    // position: absolute;
    // bottom: 100px;
  }

  @keyframes line {
    0% {
      width: 0px;
    }

    100% {
      width: 400px;
    }
  }

  .btns {
    margin: 0 auto;
    text-align: center;
    margin-top: 50px;

    .tour {
      margin-right: 50px;
    }

    .github {}

    .author {
      margin-left: 50px;
    }
  }

  .footer {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #000;
    color: #fff;
    text-align: center;
    position: fixed;
    bottom: 0;
  }
</style>