const BASE_URL = 'https://vue-todo-tasks.herokuapp.com/api/tasks'

async function fetchTasks() {
  try {
    const rawResponse = await fetch(BASE_URL)
    const response = await rawResponse.json()
    return [response, null]
  } catch (error) {
    return [null, error]
  }
}

async function updateTask(id, ops) {
  try {
    const rawResponse = await fetch(BASE_URL + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ops)
    })
    if (rawResponse.status !== 200) {
      throw new Error(`Couldn't update task`)
    }
    return [rawResponse.status, null]
  } catch (error) {
    return [null, error]
  }
}

async function createTask(ops) {
  try {
    const rawResponse = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ops)
    })
    if (rawResponse.status !== 201) {
      throw new Error(`Couldn't create new task`)
    }
    return [rawResponse.status, null]
  } catch (error) {
    return [null, error]
  }
}

async function deleteTask(id) {
  try {
    const rawResponse = await fetch(BASE_URL + `/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (rawResponse.status !== 204) {
      throw new Error(`Couldn't delete task`)
    }
    return [rawResponse.status, null]
  } catch (error) {
    return [null, error]
  }
}

export default {
  fetchTasks,
  updateTask,
  deleteTask,
  createTask
}