import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import TodoForm from './TodoForm'
import axios, { Urls } from '../api/axios'
import './index.css'

// type Todo = {
//   id: number,
//   name: string,
//   done: boolean
// }



const Todo: React.FC = () => {

  const [todos, setTodos] = useState<API.todos[]>([])
  
  useEffect(() => {
    refreshTodos()
  }, [])

  /** 切换todo状态 */
  const onToggleTodo = async (todo: API.todos) => {
    await axios(Urls.TOGGLE, todo.id)
    refreshTodos()
  }

  /** 刷新todo列表 */
  const refreshTodos = async () => {
    let data = await axios(Urls.TODOS)
    setTodos(data)
    console.log(data, '---data---')
  }

  return (
    <div className="App">
      <ul>
        <TodoForm refreshTodos={refreshTodos}/>
        {
          todos.map((todo, index) => (
            <li
              onClick={() => onToggleTodo(todo)}
              key={index}
              className={classnames({
                done: todo.done
              })}
            >
              {todo.name}（{todo.done ? '已完成' : '未完成'}）
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Todo
