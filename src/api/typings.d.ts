/** API模块 */
/**
 * 在 .d.ts 后缀文件使用declare声明与在 .ts 文件 declare global声明效果相同，
 * 均可全局访问
 */
declare module API {

    /** todos接口 */
    interface todos {
        /** id */ 
        id: number
        /** 名字 */ 
        name: string
        /** 是否完成 */ 
        done: boolean
    }

    /** url类型 */
    type Url = '/api/todos' | '/api/toggle' | '/api/add'

}