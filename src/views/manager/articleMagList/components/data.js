export const testData = "**a 标签在点击之后会聚焦自动出现虚线框？**\n\n解决方法：\n1.css 处理方式\n\n```javascript\na{\n    outline:none;\n}\n```\n2.添加监听事件，自动失去焦点（不推荐）\n\n```javascript\n<a href=\"#\" onfocus=\"this.blur();\"></a>\n```\n3.行内处理样式\n\n```javascript\n<a hidefocus=\"true\" href=\"#\"></a>\n```\n\n**<a>标签在新的选项卡中打开链接**\n\n```javascript\n<a target=\"value\">\n```\n| 值 | 描述 |\n|--|--|\n|_blank \t  | 在新窗口中打开被链接文档\t |\n|_self \t默认 \t  | 在相同的框架中打开被链接文档 |\n|_parent \t  | 在父框架集中打开被链接文档\t |\n|_top \t  | 在整个窗口中打开被链接文档\t |\n|framename \t  | 在指定的框架中打开被链接文档\t |\n \t\n**vue打开新页面**：\n\n```javascript\n let routes = this.$router.resolve(\n \t{\n \t\t path: '/position/recruit/job/desc',\n \t\t query: { id: row.id }\n    }\n )\n window.open(routes.href, '_blank')\n```\n\n"
export const toolbars= {
    bold: true, // 粗体
    italic: true, // 斜体
    header: true, // 标题
    underline: true, // 下划线
    strikethrough: true, // 中划线
    mark: true, // 标记
    superscript: true, // 上角标
    subscript: true, // 下角标
    quote: true, // 引用
    ol: true, // 有序列表
    ul: true, // 无序列表
    link: true, // 链接
    imagelink: true, // 图片链接
    code: true, // code
    table: true, // 表格
    fullscreen: false, // 全屏编辑
    readmodel: false, // 沉浸式阅读
    htmlcode: true, // 展示html源码
    help: true, // 帮助
    /* 1.3.5 */
    undo: true, // 上一步
    redo: true, // 下一步
    trash: true, // 清空
    save: false, // 保存（触发events中的save事件）
    /* 1.4.2 */
    navigation: true, // 导航目录
    /* 2.1.8 */
    alignleft: true, // 左对齐
    aligncenter: true, // 居中
    alignright: true, // 右对齐
    /* 2.2.1 */
    subfield: true, // 单双栏模式
    preview: false // 预览
  }