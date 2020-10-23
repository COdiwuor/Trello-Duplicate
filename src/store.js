import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import {
  saveStatePlugin,
  uuid
} from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {
    CREATE_TASK(state, {
      tasks,
      name
    }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    CREATE_COLUMN(state, {
      name
    }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
    UPDATE_TASK(state, {
      task,
      key,
      value
    }) {
      task[key] = value
      // Vue.set(tasks, key, value)
    },
    MOVE_TASK(state, {
      fromTasks,
      fromTaskIndex,
      toTasks,
      toTaskIndex
    }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN(state, {
      fromColumnIndex,
      toColumnIndex
    }) {
      const columnList = state.board.columns
      const moveColumn = columnList.splice(fromColumnIndex, 1)[0]

      columnList.splice(toColumnIndex, 0, moveColumn)
    }
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  }
})