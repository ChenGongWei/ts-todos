
let todos:API.todos[] = [
    {
        id: 1,
        name: '代办1',
        done: false
    },
    {
        id: 2,
        name: '代办2',
        done: false
    },
    {
        id: 3,
        name: '代办3',
        done: true
    },
    {
        id: 4,
        name: '代办4',
        done: false
    },
]

export enum Urls {
    TODOS = '/api/todos',
    TOGGLE = '/api/toggle',
    ADD = '/api/add'
}

// 定义一个工具类型
// 根据泛型传入值来返回一个自定义的key
type Key<U> = U extends Urls.TODOS 
                ? 'todos' : U extends Urls.TOGGLE 
                ? 'toggle' : U extends Urls.ADD 
                ? 'add' : 'other'

// 根据泛型传入值获取对应key
// 再根据key获取对应的参数类型
type Payload<P> = {
    todos: any
    toggle: number
    add: API.todos
    other: any
}[Key<P>]


// 根据key获取对应的结果类型
type Result<R> = {
    todos: API.todos[],
    toggle: boolean,
    add: boolean,
    other: any
}[Key<R>]

// 不需要传payload的接口
type UrlNoPayload = Urls.TODOS
// 需要传payload的接口  
// Exclude为TypeScript内置类型，可以对传入类型排除某些类型
type UrlWithPayload = Exclude<Urls, UrlNoPayload>

function axios <T extends UrlNoPayload>(url: T): Promise<Result<T>>

function axios <T extends UrlWithPayload>(url: T, payload: Payload<T>): Promise<Result<T>> | never

// T：泛型
function axios <T extends Urls>(url: T, payload?: Payload<T>): Promise<Result<T>> | never {
    let res
    switch (url) {
        case Urls.TODOS:
            res = todos.slice()
            break
        case Urls.TOGGLE:
            const todo = todos.find(({ id }) => id === payload)
            if(todo) {
                todo.done = !todo.done
            }
            res = true
            break
        case Urls.ADD:
            // 变量后面加!  为了让undefined和null通过编译
            todos.push(payload!)
            res = true
            break
        default:
            throw new Error('Unknow api!')
    }
    return Promise.resolve(res as any)
}

export default axios