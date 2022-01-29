<script>
import api from './api'
export default {
  name: 'App',
  data() {
    return {
      taskList: [
        {
          id: 1,
          title: 'aaa',
          description: 'descrição da task aaa',
          completed: false,
        },
        {
          id: 1,
          title: 'bbb',
          description: 'descrição da task bbb',
          completed: false,
        },
        {
          id: 1,
          title: 'ccc',
          description: 'descrição da task ccc',
          completed: false,
        },
      ],
      newTask: {
        title: '',
        description: '',
      },
      taskTobeUpdated: {
        title: '',
        description: '',
      },
    }
  },
  methods: {
    cleanFormState() {
      ;(this.newTask.title = ''),
        (this.newTask.description = ''),
        (this.taskTobeUpdated.title = ''),
        (this.taskTobeUpdated.description = '')
    },
    /**
     * @param {string} id
     */
    findTaskById(id) {
      return this.taskList.findIndex((elem) => elem.id === id)
    },
    async updateTask(id, ops) {
      if (!id) {
        // TODO: make a better warning to the user that this task couldn't be updated
        return [null, new Error(`No id was given`)]
      }

      if (!Object.keys(ops).length) {
        return [null, new Error(`No content were given to update in task`)]
      }

      return await api.updateTask(id, { ...ops })
    },
    async handleTaskEditionForm(id) {
      if (!this.taskTobeUpdated.title || !this.taskTobeUpdated.description) {
        // TODO: make a better warning to the user that the title or description are lacking
        return
      }

      const taskPosition = this.findTaskById(id)
      if (taskPosition === -1) {
        // TODO: make a better warning to the user that this task couldn't be updated
        return
      }
      const [updateStatus, error] = await this.updateTask(id, {
        title: this.taskTobeUpdated.title,
        description: this.taskTobeUpdated.description,
      })
      if (error) {
        // TODO: make a better warning to the user that this task couldn't be updated
        return
      }
      this.cleanFormState()
      await this.getAllTasks()
    },
    /**
     * @param {string} - id
     */
    async handleCompletedBtnClick(id) {
      // debugger
      const taskPosition = this.findTaskById(id)
      if (taskPosition === -1) {
        // TODO: make a better warning to the user that this task couldn't be updated
        return
      }
      const [updateStatus, error] = await this.updateTask(id, {
        completed: !this.taskList[taskPosition].completed,
      })
      if (error) {
        // TODO: make a better warning to the user that this task couldn't be updated
        return
      }
      await this.getAllTasks()
    },
    /**
     * @param {string} id
     */
    async handleDeleteBtnClick(id) {
      const taskPosition = this.findTaskById(id)
      if (taskPosition === -1) {
        // TODO: make a better warning to the user that this task couldn't be updated
        return
      }
      const [updateStatus, error] = await api.deleteTask(id, {
        completed: !this.taskList[taskPosition].completed,
      })
      if (error) {
        // TODO: make a better warning to the user that this task couldn't be updated
        return
      }
      await this.getAllTasks()
    },
    handleShowEditionBoxBtnClick(id) {
      const taskPosition = this.findTaskById(id)
      this.taskList[taskPosition].showEditionBox =
        !this.taskList[taskPosition].showEditionBox
    },
    async getAllTasks() {
      const [tasks, error] = await api.fetchTasks()
      if (error) {
        return
      }
      this.taskList = tasks.map((task) => ({ ...task, showEditionBox: false }))
      console.log(this.taskList)
    },
    async createNewTask() {
      if (!this.newTask.title || !this.newTask.description) {
        // TODO: make a better warning to the user that the title or description are lacking
        return
      }
      const [status, error] = await api.createTask({
        ...this.newTask,
      })

      if (error) {
        return
        // TODO: make a better warning to the user that the new task couldn't be created
      }
      this.cleanFormState()
      await this.getAllTasks()
    },
  },
  async created() {
    await this.getAllTasks()
  },
}
</script>

<template>
  <h1>todo</h1>
  <div>
    <form @submit.prevent="createNewTask" method="post">
      <input v-model="newTask.title" placeholder="Nova task" />
      <br />
      <textarea
        v-model="newTask.description"
        placeholder="Coloque aqui a task que vc vai atrasar"
      ></textarea>
      <br />
      <button>Criar</button>
    </form>
  </div>
  <div>
    <div v-for="task in taskList" :key="task.id">
      <div v-if="task.showEditionBox">
        <form @submit.prevent="handleTaskEditionForm(task.id)" method="post">
          <input v-model="taskTobeUpdated.title" :placeholder="task.title" />
          <br />
          <textarea
            v-model="taskTobeUpdated.description"
            :placeholder="task.description"
          ></textarea>
          <br />
          <button>Salvar</button>
        </form>
      </div>

      <div v-else>
        <b>{{ task.title }}</b>
        <p>{{ task.description }}</p>

        <div v-if="task.completed">
          <button @click="handleCompletedBtnClick(task.id)">Done! :)</button>
        </div>
        <div v-else>
          <button @click="handleCompletedBtnClick(task.id)">Undone! :)</button>
        </div>

        <button @click="handleDeleteBtnClick(task.id)">Delete</button>
      </div>
      <button @click="handleShowEditionBoxBtnClick(task.id)">Editar</button>
      <br />
    </div>
  </div>
</template>
