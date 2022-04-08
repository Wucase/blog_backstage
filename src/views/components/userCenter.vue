<template>
  <div class='text'>
    <div class="userLogo">
      <div class="avatar"  v-if="isLogin">
        <img src="@/assets/images/myicon.jpg" alt="" />
      </div>
      <div class="userName">
        <el-dropdown trigger="click" v-if="!isLogin">
          <el-link :underline="false" type="primary" class="el-dropdown-link" @click="toLogin">
            {{ "Sign In" }}
          </el-link>
        </el-dropdown>
        <el-dropdown trigger="click" @command="menuClick" v-else>
                          <span class="el-dropdown-link">
                            {{ $store.getters.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in options" :key="index" :command="item">
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'text',
  props: {},
  components: {},
  data() {
    return {
      options: [
        {
          label: "个人中心",
          path: "",
        },
        {
          label: "修改密码",
          path: "",
        },
        {
          label: "退出登录",
          path: "",
        },
      ],
    }
  },
  computed:{
    isLogin(){
      return !!this.$store.getters.getToken
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    loginOut() {
      window.sessionStorage.clear();
      window.localStorage.clear();
      this.$store.commit('resetUser')
      this.$router.push("/");
    },
    toLogin() {
      this.$store.state.user.token ? this.$router.push("/manager/articleCreate") :
          this.$store.commit("setShowLogin", true)
    },
    menuClick(item) {
      console.log(item.label);
      switch (item.label) {
        case "个人中心":
          break;
        case "修改密码":
          break;
        case "退出登录":
          // this.loginOutDrawer = true;
          // this.loginOutImg = require("@/assets/img/loginOutImg/loginOut" +
          //   Math.floor(Math.random() * (6 - 1 + 1) + 1) +
          //   ".jpg");
          break;
      }
    },
  }
}
</script>

<style lang='scss' scoped>
.userLogo {
  display: flex;
  justify-content: flex-end;
  height: 60px;
  width: 100%;
}

.avatar {
  width: 40px;
  height: 60px;
  line-height: 60px;
  padding-top: 10px;
  margin-left: 30px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
}

.userName {
  width: 100px;
  height: 40px;

  .el-dropdown {
    line-height: 60px;
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>
