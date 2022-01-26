<script>
  export default {
    name: 'App',
    data() {
      return {
        taskList: [
          { id: 1, title: 'aaa', description: "descrição da task aaa", completed: false },
          { id: 1, title: 'bbb', description: "descrição da task bbb", completed: false },
          { id: 1, title: 'ccc', description: "descrição da task ccc", completed: false },
        ]
      }
    },
    methods: {
      handleDoneBtnClick(event) {
        console.log(this.taskList)
      }
    }
  }
</script>
<template>
  <h1>todo</h1>
  <div>
    <div v-for="task in taskList">
      <div>
        <b>{{ task.title }}</b>
        <p>{{ task.description }}</p>
        <button @click="handleDoneBtnClick">Done!</button>
      </div>
      <br>
    </div>
  </div>
</template>

