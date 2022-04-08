<template>
  <el-dialog title="用户登录" :visible.sync="$store.getters.showLogin" width="350px" :destroy-on-close="true"
    :before-close="handleClose" :close-on-click-modal="false">

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
    <!-- <el-divider></el-divider> -->
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose" size="small" class='cancel'>取 消

      </el-button>
      <el-button type="primary" @click="submitForm" size="small" :loading="btnLoading" class="submit">登 陆
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { userLogin, getCaptcha } from "@/api/user";
  import { mapActions } from "vuex";
  export default {
    name: "loginForm",
    components: {},
    props: { dialogVisible: { type: Boolean, default: false } },
    data() {
      return {
        btnLoading: false,
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
    watch: {
    },
    created() {

    },
    mounted(){
    },
    methods: {
      ...mapActions(["setUserAction", "setTokenAction", "setUserIdAction"]),
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
            this.btnLoading = true;
            let res = await userLogin(params);

            if (res.meta.status === 200) {
              this.$store.commit("setShowLogin", false)
              this.btnLoading = false;
              let userInfo = res.data;
              console.log(">>>>>>", userInfo)
              this.$store.commit("setUser", userInfo[0])
              this.$store.commit("setUserName", userInfo[0].username)
              this.$store.commit("setUserId", userInfo[0].userId)
              this.$store.commit("setToken", res.meta.token)
              this.$notify.success(res.meta.msg);
              this.$router.push(this.$store.getters.lastRoute);
            } else if (res.meta.status === 201) {
              this.btnLoading = false;
              this.$message.error(res.meta.msg);
              this.registerStyle = true;
              this.getCaptcha();
              this.resetForm();
            } else {
              this.btnLoading = false;
              this.$notify.error(res.meta.msg);
              this.registerStyle = true;
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
      handleClose() {
        this.getCaptcha();
        this.$store.commit("setShowLogin", false)
      },
    },
  };
</script>

<style lang='scss' scoped>
  div /deep/ .el-dialog {
    border-radius: 10px !important;
    background-color: rgba(0, 10, 10, 0.6) !important;
    height: 350px !important;
    color: #fff !important;
    box-sizing: border-box;
    padding: 0 20px;

    .el-dialog__title {
      color: #fff !important;
    }

    .el-dialog__header {
      padding: 10px;
    }

    .el-dialog__body {
      padding: 15px 25px 0 25px;
    }

    .el-dialog__footer {
      padding: 0 25px 15px 25px;
      text-align: center;
    }
  }

  .title-show {
    text-align: center;

    span {
      display: inline-block;
    }

    .icon-title {
      color: rgb(75, 163, 240);
      font-size: 30px !important;
    }

    // background-color: #fff;
  }

  .captcha {
    display: flex;
    justify-content: flex-start;
  }

  .captchaImg {
    margin-top: 6px;
    margin-left: 10px;
    height: 32px;

    border-radius: 5px;
  }

  .dialog-footer {
    .cancel {}

    .submit {
      width: 190px;
    }
  }
</style>