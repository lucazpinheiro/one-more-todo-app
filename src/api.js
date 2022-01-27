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

export default {
  fetchTasks
}