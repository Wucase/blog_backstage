<template>
  <div class="search">
    <div class="clearfix">
      <h2
        style="font-size: 20px; color: rgb(153,153,153)">
        <span
          class="iconfont icon-remen title"></span>
        blog友链接
      </h2>
    </div>
    <el-divider></el-divider>
    <div class="typeList">
      <ul>
        <li
          v-for="(item, index) in typeList"
          :key="index">

          <el-link
            :underline="false">
            {{item.label}}
          </el-link>
          <span
            class="iconfont icon-youjiantou_huaban"
            style="margin-right:0;"></span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { touristList } from "./data.js";
export default {
  name: "hotArticle",
  components: {},
  data() {
    return {
      typeList: touristList,
    };
  },
  created() {
    this.articalBI = true;
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.search {
  /* height: 250px; */
  padding: 10px;
  box-sizing: border-box;
  background-color: #fff;
  margin: 20px 0;
  h2 {
    margin-top: 0;
  }
}

/deep/ .el-card__header {
  padding: 10px 0;
}

.title {
  font-size: 20px;
  color: #6bc30d;
}
.typeList {
  margin: 10px 0;

  ul {
    list-style: none;
    position: relative;
    left: 0;
    top: 0;
    padding-left: 20px;

    li {
      /* padding: 0 25px; */
      height: 39px;
      color: #787977;
      line-height: 39px;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;

      span {
        width: 20px;
        display: inline-block;
        font-size: 20px;
      }
      a {
        flex: 1;
        display: inline-block;
        text-align: left;
        margin-left: 7px !important;
      }
      &:hover span {
        color: rgb(64, 158, 255);
      }

      div {
        width: 25px;
        height: 25px;
        background-color: #ddd;
        border-radius: 50%;
        margin-top: 7px;
        text-align: center;
        line-height: 25px;
      }
      &:nth-child(1) > div {
        background-color: red;
        color: #fff;
      }
      &:nth-child(2) > div {
        background-color: skyblue;
        color: #fff;
      }
      &:nth-child(3) > div {
        background-color: #6bc30d;
        color: #fff;
      }
      .el-link {
        margin-left: 15px;
      }
    }
  }
}
.el-divider {
  margin: 10px 0 !important;
}
</style>