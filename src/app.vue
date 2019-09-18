<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <todo></todo>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './todo/header.vue' // 引入header组件
import Footer from './todo/footer.jsx' // 引入footer组件
import Todo from './todo/todo.vue'
export default { // 声名组件
  components: {
    Header,
    Footer,
    Todo
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background-color #d4d4d4
  opacity .3
  z-index -1
}
</style>
