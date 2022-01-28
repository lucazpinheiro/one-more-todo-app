<script>
  import api from './api'
  export default {
    name: 'App',
    data() {
      return {
        taskList: [
          { id: 1, title: 'aaa', description: "descrição da task aaa", completed: false },
          { id: 1, title: 'bbb', description: "descrição da task bbb", completed: false },
          { id: 1, title: 'ccc', description: "descrição da task ccc", completed: false },
        ],
        newTask: {
          title: "",
          description: ""
        }
      }
    },
    methods: {
      /**
       * @param {string} id 
       */
      async handleCompletedBtnClick(id) {
        const taskPosition = this.taskList.findIndex((elem) => elem.id === id)
        if (taskPosition === -1) {
          // TODO: make a better warning to the user that this task couldn't be updated
          return
        }
        const [updateStatus, error] = await api.deleteTask(id)
        if (error) {
          // TODO: make a better warning to the user that this task couldn't be updated
          return
        }
        this.getAllTasks()
      },
      /**
       * @param {string} id 
       */
      async handleDeleteBtnClick(id) {
        const taskPosition = this.taskList.findIndex((elem) => elem.id === id)
        if (taskPosition === -1) {
          // TODO: make a better warning to the user that this task couldn't be updated
          return
        }
        const [updateStatus, error] = await api.deleteTask(id, {
          completed: !this.taskList[taskPosition].completed
        })
        if (error) {
          // TODO: make a better warning to the user that this task couldn't be updated
          return
        }
        await this.getAllTasks()
      },
      async getAllTasks() {
        const [tasks, error] = await api.fetchTasks()
        if (error) {
          return
        }
        this.taskList = tasks
      },
      async createNewTask() {
        debugger
        console.log(this.newTask)

        if (!this.newTask.title || !this.newTask.description) {
          // TODO: make a better warning to the user that the title or description are lacking
          return
        }

        const [status, error] = await api.createTask({
          ...this.newTask
        })

        if (error) {
          return
          // TODO: make a better warning to the user that the new task couldn't be created
        }
        await this.getAllTasks()
      }
    },
    async created() {
        await this.getAllTasks()
    }
  }
</script>

<template>
  <h1>todo</h1>
  <div>
    <form
      @submit.prevent="createNewTask"
      method="post"
    >
      <input v-model="newTask.title" placeholder="Nova task" />
      <br>
      <textarea v-model="newTask.description" placeholder="Coloque aqui a task que vc vai atrasar"></textarea>
      <br>
      <button>Criar</button>
    </form>
  </div>
  <div>
    <div v-for="task in taskList" :key="task.id">
      <div>
        <b>{{ task.title }}</b>
        <p>{{ task.description }}</p>
        <div>
          <div v-if="task.completed">
            <button @click="handleCompletedBtnClick(task.id)">Done! :)</button>
          </div>
          <div v-else>
            <button @click="handleCompletedBtnClick(task.id)">Undone! :)</button>
          </div>
        </div>
        <button @click="handleDeleteBtnClick(task.id)">Delete</button>
      </div>
      <br>
    </div>
  </div>
</template>
