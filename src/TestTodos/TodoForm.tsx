import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios, { Urls } from '../api/axios'
import './TodoForm.css'

interface Props {
    /** 刷新todo列表 */
    refreshTodos: () => Promise<void>
}

const TodoForm: React.FC<Props> = ({ refreshTodos }) => {

    const [name, setName] = useState<string>('')

    // 修改待办项标题
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        // 阻止事件冒泡
        e.preventDefault()

        // 去除两边空格
        if(!name.trim())
            return

        const newTodo = {
            id: new Date().getTime(),
            name,
            done: false
        }

        axios(Urls.ADD, newTodo).then(() => {
            refreshTodos()
            setName('')
        })
    }

    return (
        <form className="todo-form" onSubmit={onSubmit}>
            <input 
                className="todo-input"
                value={name}
                onChange={onChange}
                placeholder="请输入代办事项"
            />
            <button type="submit">新增</button>
        </form>
    )
}

export default TodoForm