<template>
  <div class='Login'>
    <div class="login-logo">
      <div class="home-main-bottom">
        <div class="title-show">
          <span class="animated bounceInDown" style="animation-delay: 0.2s;" :class="{'is-mouted': isMouted}"><i
              class="iconfont icon-W_round_solid icon-title"></i></span>
          <span class="animated bounceInDown" style="animation-delay: 0.5s;"><i
              class="iconfont icon-M_round_solid icon-title"></i></span>
          <span class="animated bounceInDown " style="animation-delay: 0.1s;"><i
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
        <div class="login-box">
          <div class="login-border">
            <div class="all-border" v-for="index in 4" :key="index" :class="{'all-border-move': isLoginPage}"></div>
          </div>
          <div class="login-form">
            <el-form :model="loginForm" status-icon :rules="LoginRules" ref="loginForm" class="demo-ruleForm">
              <el-form-item prop="userName">
                <el-input type="text" v-model="loginForm.userName" autocomplete="off" placeholder="用户名" size="small"
                          prefix-icon="el-icon-user">
                </el-input>
              </el-form-item>
              <el-form-item prop="passWord">
                <el-input type="password" v-model="loginForm.passWord" autocomplete="off" placeholder="密码" size="small"
                          prefix-icon="el-icon-lock" show-password>
                </el-input>
              </el-form-item>
              <div class="captcha">
                <el-form-item prop="captcha">
                  <el-input type="text" v-model="loginForm.captcha" autocomplete="off" placeholder="验证码" size="small"
                            style="width:170px;" prefix-icon="el-icon-picture">
                  </el-input>

                </el-form-item>
                <img class="captchaImg" :src="$getCaptcha" alt="" ref="captcha" style="width:100px;height:30px;"
                     @click="getCaptcha">
              </div>

            </el-form>
          </div>
          <div class="btns">
            <div class="first-rang"></div>
            <div class="out-rang"></div>
            <div class="mid-rang"></div>
            <div class="in-rang" @click="submitForm">START</div>
          </div>
        </div>
      </div>
    </div>


    <div v-if="loginDialogVisible">
      <login-form :dialogVisible="loginDialogVisible" @cancel="cancel">
      </login-form>
    </div>
<!--    <div class='footer'>-->
<!--      Copyright © 2018-2020 beiguyan All Rights Reserved V.0.0.0 备案号: <el-link type="primary" :underline="false"-->
<!--        @click="toBan">-->
<!--        粤ICP备2021073416号-1</el-link>-->
<!--    </div>-->
  </div>
</template>

<script>
  import ShiMask from "./components/ShiMask.vue";
  import LoginForm from "./components/loginForm.vue";
  import { getMenuListFun } from "@/utils/tools";
  import { userLogin, getCaptcha } from "@/api/user";
  export default {
    name: "Login",
    components: { ShiMask, LoginForm },
    props: {},
    data() {
      return {
        loginDialogVisible: false,
        menuList: [],
        isLoginPage: false,
        isMouted: false,
        loginForm: {
          userName: "",
          passWord: "",
          captcha: "",
        },
        captchaImg: "",
        LoginRules: {
          userName: [
            { required: true, message: "请输入用户名", trigger: "blur" },
          ],
          passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
          captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        },
      };
    },
    mounted() {
      setTimeout(()=>{
        this.isLoginPage = true
      }, 1000)
    },
    created() {
      this.getMenuList()
    },
    methods: {
      getCaptcha() {
        console.log('---------', this.$refs.captcha.src);
        this.$refs.captcha.src = this.$getCaptcha + "/?id=" + Math.random();
      },
      submitForm() {
        this.$refs.loginForm.validate(async (valid) => {
          if (valid) {
            let params = {
              userName: this.loginForm.userName,
              passWord: this.loginForm.passWord,
              captcha: this.loginForm.captcha,
            };
            let res = await userLogin(params);

            if (res.meta.status === 200) {
              this.$store.commit("setShowLogin", false)
              this.btnLoading = false;
              let userInfo = res.data;
              this.$store.commit("setUser", userInfo[0])
              this.$store.commit("setUserName", userInfo[0].username)
              this.$store.commit("setUserId", userInfo[0].userId)
              this.$store.commit("setToken", res.meta.token)
              this.$notify.success(res.meta.msg);
              this.$router.push(this.$store.getters.lastRoute);
            } else if (res.meta.status === 201) {
              this.btnLoading = false;
              this.$message.error(res.meta.msg);
              this.getCaptcha();
              this.resetForm();
            } else {
              this.btnLoading = false;
              this.$notify.error(res.meta.msg);
              this.getCaptcha();
              this.resetForm();
            }
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.getCaptcha();
        this.$refs.loginForm.resetFields();
      },
      async getMenuList() {
        let userMenu = JSON.parse(window.sessionStorage.getItem("userMenu"))
        if (userMenu) return
        this.menuList = await getMenuListFun('user')
      },
      touristTo() {
        this.$router.push("/users");
        this.$store.dispatch("GetUserInfo", 'user')
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
      },
      toArticleList(){
        this.$router.push("/users")
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
    box-sizing: border-box;
    position: relative;
    top: 0;
    left: 0;
.turn {

  animation: spinner 1s infinite linear;
}
    .login-logo {
      margin: 0 auto;
      width: 100%;
      height: 100% !important;
      display: flex;
      justify-content: center;
      align-items: center;
      .home-main-bottom {

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
          span:nth-child(3) {
            transition: all 3s linear 2s;
          }
        }
.is-mouted{
  animation: turn 1.5s  infinite linear;
}
        .title-line {
          width: 100%;
          height: 65px;
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
            //transition: width 1s linear;
          }
        }


      }
    }
  }


  @keyframes line {
    0% {
      width: 0px;
    }

    100% {
      width: 350px;
    }
  }


  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
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
  .login-box{
    width: 300px;
    height: 300px;
    margin-right: auto;
    margin-left: auto;
    border-bottom-left-radius: 25px;
    border-top-right-radius: 25px;

    position: relative;
    top: 0;
    left: 0;
    .login-border{
      width: 100%;
      height: 100%;
      position: relative;
      top: 0;
      left: 0;
      .all-border{
        border-radius: 2px;
        width: 0;
        background: #fff;
      }
      .all-border:nth-child(1){
        width: 5px;
        height: 0px;
        position: absolute;
        top: 2px;
        left: 0;
      }
      .all-border:nth-child(2){
        width: 0px;
        height: 5px;
        position: absolute;
        top: 0px;
        left: 0px;
      }
      .all-border:nth-child(3){
        width: 5px;
        height: 0px;
        position: absolute;
        bottom: 2px;
        right: 0;
      }
      .all-border:nth-child(4){
        width:0px;
        height: 5px;
        position: absolute;
        right: 0px;
        bottom: 0;
      }

      .all-border-move:nth-child(1){
        height: 130px;
        transition: height 1s linear;

      }
      .all-border-move:nth-child(2){
        width: 180px;
        transition: width 1s linear;

      }
      .all-border-move:nth-child(3){

        height: 130px;
        transition: height 1s linear;

      }
      .all-border-move:nth-child(4){
        width: 160px;
        transition: width 1s linear;

      }
    }
    .login-form{
      width: 270px;
      height: 270px;
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: #fff;
      margin-left: -135px;
      margin-top: -135px;
      border-radius: 15px;
      padding: 25px;
      padding-top: 65px;
      box-sizing: border-box;
      .captcha{
        display: flex;
        justify-content: flex-start;
        .el-form-item /deep/ .el-input {
          width: 140px !important;
        }
      }
      .el-form-item /deep/ .el-input .el-input__inner{
        border-radius: 0;
        border: none;
        border-bottom: 1px solid rgb(75, 163, 240);
      }
    }
    .btns {
      position: absolute;
      top: 35px;
      right: 35px;
      .first-rang{
        position: absolute;
        width: 88px;
        height: 88px;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        margin-left: -44px;
        margin-top: -44px;
        background-color: rgb(75, 163, 240);
      }
      .out-rang{
        position: absolute;
        width: 70px;
        height: 70px;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        margin-left: -35px;
        margin-top: -35px;
        background: lightskyblue;

      }
      .mid-rang{
        position: absolute;
        width: 60px;
        height: 60px;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        transform: translate(-30px,-30px);
        background-color: rgb(75, 163, 240);
      }
      .in-rang{
        position: absolute;
        width: 50px;
        height: 50px;
        top: 50%;
        left: 50%;
        border-radius: 50%;

        background-color: #fff;
        color: rgb(75, 163, 240);
        text-align: center;
        line-height: 50px;
        font-size: 12px;
        margin-left: -25px;
        margin-top: -25px;
        transform-origin: center center;
        animation: spinner 3s  infinite linear;
        cursor: pointer;
        &:hover{
          background-color: skyblue;
          color: #fff;
        }
      }
    }

  }
</style>