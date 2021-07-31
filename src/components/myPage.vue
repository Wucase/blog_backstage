<template>
  <div class='myPage'>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "myPage",
  components: {},
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
</style>