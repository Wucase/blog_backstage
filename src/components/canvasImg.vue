<template>
  <div class='canvasImg'>
    <canvas ref="canvasImg" width="30px" height="30px"></canvas>
  </div>
</template>

<script>
  export default {
    name: 'canvasImg',
    components: {

    },
    props: {

      title: {
        type: String,
        default: 'Hello'
      }
    },
    data() {
      return {
      }
    },
    created() {

    },
    mounted() {
      this.initCanvas()
    },
    methods: {
      initCanvas() {
        var canvas = this.$refs.canvasImg;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);


        //绘制矩形
        ctx.fillRect(0, 0, 30, 30);
        ctx.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
        ctx.font = "18px '微软雅黑'";
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        // 绘制文字（参数：要写的字，x坐标，y坐标）
        let text = this.title.slice(0, 1).toUpperCase()
        ctx.fillText(text, 15, 18);
      }
    }
  }
</script>

<style lang='scss' scoped>
  .canvasImg {
    margin-top: 5px;
  }
</style>