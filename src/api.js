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
    const response = await rawResponse.json()
    return [{
      status: rawResponse.status,
      response
    }, null]
  } catch (error) {
    return [null, error]
  }
}

export default {
  fetchTasks,
  updateTask
}