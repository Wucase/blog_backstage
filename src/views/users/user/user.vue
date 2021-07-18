<template>
  <div class='user'>
    <!-- 主页头部 -->
    <div class="home-header">
      <user-blog-header>
      </user-blog-header>
    </div>

    <!-- blo主体 -->
    <div class="user-main">
      <div
        class="user-main-aside">
        <about-user>
        </about-user>
        <div
          style="margin-top:20px;">
          <classfiy-hot>
          </classfiy-hot>
        </div>
        <div
          style="margin-top:20px;">
          <hot-article>
          </hot-article>
        </div>
        <div
          class="friend-link">
          <friend-link>
          </friend-link>
        </div>
      </div>
      <div
        class="user-main-right">
        <router-view>
        </router-view>
      </div>

    </div>
    <div
      class="user-blog-foot">
      <p>
        Copyright © 2018-2020
        beiguyan All Rights
        Reserved V.0.0.0
        备案号:<i>粤ICP备00000000号</i>
      </p>
    </div>
  </div>
</template>

<script>
import UserBlogHeader from "@/views/users/userBlogHeader/userBlogHeader.vue";
import AboutUser from "@/views/users/components/aboutUser/aboutUser.vue";
import ClassfiyHot from "@/views/users/components/classfiyHot/classfiyHot.vue";
import HotArticle from "@/views/users/components/hotArticle/hotArticle.vue";
import FriendLink from "@/views/users/components/friendLink/friendLink.vue";
export default {
  name: "user",
  components: {
    UserBlogHeader,
    AboutUser,
    ClassfiyHot,
    HotArticle,
    FriendLink,
  },
  props: {},
  data() {
    return {};
  },
  mounted() {},
  created() {},
  methods: {},
};
</script>

<style lang='scss' scoped>
.user {
  font: 14px/1.5 "Helvetica neue", Helvetica, Tahoma, "lantinghei sc",
    "Microsoft Yahei", sans-serif;
  color: #515250;
  -webkit-font-smoothing: antialiased;
  width: 100%;
  /* height: 100%; */
  background-color: rgb(240, 243, 244);

  .home-header {
    width: 100%;
    height: 60px;
    background-color: #fff;
  }

  .user-main {
    width: 85%;
    margin-top: 15px !important;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    .user-main-aside {
      width: 300px;
      background-color: rgb(240, 243, 244);
    }
    .user-main-right {
      flex: 1;
      // margin-left: 15px;
      // background-color: #fff;
      // background-color: #fff;
    }
  }
}
.user-blog-foot {
  width: 100%;
  height: 50px;
  background-color: rgb(64, 64, 64);
  text-align: center;
  line-height: 50px;
  color: #bbb;
  i {
    color: #fff;
  }
}
</style>