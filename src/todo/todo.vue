<template>
  <div>
    <section class="real-app">
    <input 
    type="text"
    class="add-input"
    autofocus="autofocus"
    placeholder="接下来要去做什么？"
    @keyup.enter="addTodo"
    >
    <item 
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    />
    <tabs 
    :filter="filter" 
    :todos="todos" 
    @toggle="toggleFilter"
    @clearAll="clearAllCompleted"
    >
    </tabs>
    </section>
  </div>
</template>

<script>
import Item from './item.vue'
import Tabs from './tables.vue'
let id = 0
export default {
  data() {
    return {
      todos: [],
      filter: "all"
    }
  },
  components: {
    Item,Tabs
  },
  computed: {
    filteredTodos(){
      if(this.filter === 'all') {
        return this.todos
      }
      // else if(this.filter === 'active'){
      //   return this.todos.filter(todo => !todo.completed) // return true=!false
      // }
      //   return this.todos.filter(todo => todo.completed) // reutrn true
    const completed = this.filter === 'completed'
    return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo(e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = '' //每次增减结束后内容清空
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id===id),1)
    },
    toggleFilter(state) {
      this.filter = state
    },
    clearAllCompleted() {
      this.todos=this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
.add-input
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit 
    line-height 1.4em
    outline none 
    color inherit 
    box-sizing border-box
    font-smoothing antialiased
    padding 16px 16px 16px 16px
    border none
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
</style>
