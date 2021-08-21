<template>
  <div class="search">
    <div class="clearfix">
      <h2 style="font-size: 20px; color: rgb(153,153,153)">
        <span class="iconfont icon-tag title"></span>
        blog分类
      </h2>
    </div>
    <el-divider></el-divider>
    <div class="typeList">
      <ul @mouseleave="mouseOver(currentIndex)">
        <li class="liMask" ref="liMask"></li>

        <li v-for="(item, index) in classfityList" :key="index" @click="searchType(item, index)"
          @mouseenter="mouseOver(index)" style="classfityItem">
          <img :src="$imgUrl+item.classfityIcon" alt="" v-if='item.classifyName != "全部分类" && item.iconImg' width="30px"
            height="30px" style="margin-top:5px">
          <canvas-img v-if='item.classifyName != "全部分类" && !item.iconImg' canvasHeight="30px" canvasWidth="30px"
            :title="item.classifyName">
          </canvas-img>
          <span class="iconfont icon-quanbu" v-if="item.classifyName == '全部分类'" style="font-size:30px;"></span>
          <span style="margin-left:15px">{{ item.classifyName }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { getClassfityList } from "@/api/classfity";
  import canvasImg from '@/components/canvasImg'
  import { typeList } from "./data.js";
  import { animate } from "@/utils/animate.js";
  export default {
    name: "articleSearch",
    components: {
      canvasImg
    },
    data() {
      return {
        articalBI: false,
        searchValue: "",
        typeList: typeList,
        currentIndex: 0,
        classfityList: [],
      };
    },
    created() {
      this.articalBI = true;
      this.getArticleLists();
    },
    methods: {
      getArticleLists() {
        let params = {
          pageSize: 9999,
          pageNum: 1,
        };
        this.listLoading = true;
        getClassfityList(params).then((res) => {
          this.listLoading = false;
          console.log(res);
          if (res.meta.status === 200) {
            this.classfityList = res.data.docs;
          }
        });
      },
      searchBlog() {
        console.log("+++++++++++++");
        this.$eventBus.$emit("sendSearch", this.searchValue);
      },
      searchType(item, index) {
        this.currentIndex = index;
        this.$router.push('/users');
        this.searchValue = item.classifyName;
        this.$eventBus.$emit("sendSearch", this.searchValue);
      },
      mouseOver(index) {
        let liMask = this.$refs.liMask;
        animate(liMask, index, 3);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .search {
    /* height: 250px; */
    box-sizing: border-box;
    padding: 15px;
    box-sizing: border-box;
    background-color: #fff;

    h2 {
      margin-top: 0;
    }
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
      padding-left: 0;

      li {
        padding: 0 25px;
        height: 39px;
        border-bottom: 1px solid #f8f9f7;
        transition: none;
        text-decoration: none;
        color: #787977;
        line-height: 39px;
        cursor: pointer;
        display: flex;
        justify-content: flex-start;
      }
    }
  }

  .liMask {
    height: 39px;
    line-height: 39px;
    background-color: #eee;
    opacity: 0.4;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 5s linear;
    animation: all 5s linear;
    pointer-events: none;

    &::after {
      content: "";
      display: inline-block;
      width: 4px;
      height: 39px;
      background-color: #aaa;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .el-divider {
    margin: 10px 0 !important;
  }

  .classfityItem {
    line-height: 40px;
  }
</style>