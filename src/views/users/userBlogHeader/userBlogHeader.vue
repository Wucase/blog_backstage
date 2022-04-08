<template>
  <div class="box-card">
    <el-row>
      <el-col :span="6" class="logoImg">
        <img src="@/assets/images/logo.png" alt="" class="logo" />
      </el-col>
      <el-col :span="12" class="ulList">
        <ul>
          <li @click="$router.push('/users')">
            {{  '首页'}}
          </li>
          <li v-for="(menu, index) in menuList" :key="index" :class="{ menuActive: index == menuActive }"
            @click="toPage(menu, index)">
            {{ menu.menuName }}
          </li>
          <li @click="toLogin">
            {{  '写博客'}}
          </li>
          <li @click="$router.push('/manager')" v-if="$store.getters.getToken">
            {{  'blog管理'}}
          </li>
        </ul>
      </el-col>
      <el-col :span="6">
        <user-center />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LoginForm from "@/views/login/components/loginForm.vue";
import UserCenter from '@/views/components/userCenter'
  import { getMenuListFun } from "@/utils/tools";
  export default {
    name: "",
    components: {LoginForm,UserCenter},
    data() {
      return {

        menuActive: 0,
        userName: "",
        loginOutUrl: "",
        loginOutImg: null,
        loginOutDrawer: false,
      };
    },
    computed:{
      menuList(){
        return this.$store.getters.userMenu
      },

    },
    watch: {
      $route() {
        if (this.$route.path.indexOf("writeblog") > -1)
          return (this.menuActive = 6);
        if (this.$route.path.indexOf("diary") > -1) return (this.menuActive = 3);
      },
    },
    created() {

      this.$store.commit("setShowLogin", false)
    },
    methods: {
      toLogin() {
        this.$store.state.user.token ? this.$router.push("/manager/articleCreate") :
            this.$router.push("/login")
      },
      async getMenuLists() {
        // let userMenu = JSON.parse(window.sessionStorage.getItem("userMenu"))
        // if (userMenu) return this.menuList = userMenu
        this.menuList = await getMenuListFun('user')
        // let params = {
        //   menuType: "user",
        //   pageSize: 9999,
        //   pageNum: 1,
        // };
        // this.listLoading = true;
        // getMenuList(params).then((res) => {
        //   this.listLoading = false;
        //   console.log(res);
        //   if (res.meta.status === 200) {
        //     this.menuList = res.data.docs;
        //   }
        // });
      },
      // ...mapActions(["resetUserAction"]),

      toPage(menu, index) {
        this.$router.push(menu.menuUrl);
        this.menuActive = index;
      },


    },
  };
</script>

<style lang="scss" scoped>
.box-card{
  padding: 0 60px;
}
  .el-row {
    height: 60px;

    .el-col {
      height: 60px;
    }
  }

  div {
    border: none;
    height: 60px;
  }

  .ulList {
    ul {
      list-style: none;
      height: 100%;
      line-height: 70px;
      text-align: center;
      font-size: 16px;
      display: flex;
      margin: 0 !important;
      justify-content: flex-start;

      li {
        width: 100px;
        height: 100%;
        cursor: pointer;
        position: relative;
        top: 0;
        left: 0;
        margin-right: 10px;

        &:after {
          content: "";
          width: 0;
          height: 2px;
          background-color: #6bc30d;
          position: absolute;
          bottom: 0;
          left: 50%;
          transition: all 0.7s linear;
        }

        &:hover:after {
          width: 100%;
          left: 0;
        }

        &:hover {
          color: #6bc30d;
        }
      }
    }
  }

  .menuActive {
    color: #6bc30d;

    &:after {
      width: 100% !important;
      left: 0 !important;
    }
  }

  .logo {
    height: 60px;
    margin-left: 100px;
    cursor: pointer;
  }

  .userLogo {
    display: flex;
    justify-content: flex-end;
    height: 60px;
    width: 100%;
    padding-right: 200px;
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
