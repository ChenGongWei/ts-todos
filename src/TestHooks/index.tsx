import React, { useState, useEffect, useMemo, useCallback } from "react"
import Child1 from "./child1"
import Child2 from "./child2"

const TestHooks: React.FC = () => {
    
    const [num, setNum] = useState(0)
    const [first, setFirst] = useState(0)
    const [second, setSecond] = useState(0)

    // 依赖第二个参数执行，不传或穿空数组效果相当于componentsDidMount，
    useEffect(() => {
        console.log('初始化操作')

        // 返回值会在组件销毁时执行，相当于componentsWillUnMount
        return () => {
            console.log('销毁时的操作')
        }
    },[])

    // useMemo用法和useCallback差不多，都是用来进行缓存，
    // 不同的是useMemo缓存的是第一个函数的返回值，useCallback缓存的是第一个函数
    const clearFirst = useMemo(() => {
        return () => setFirst(0)
    }, [])

    // 将函数缓存起来，避免函数重复赋值引起子组件重复渲染，只有第二个参数变化时才重新赋值
    const clearSecond = useCallback(() => {
        setSecond(0)
    }, [])

 

    console.log(num, '---parents begin-----')

    return (
        <div>
            <div style={{height: '150px', margin: '10px 0', padding: '0 10px', border: '1px solid pink'}} >
                <h3>Parent:</h3>
                <span>num: {num}</span>&emsp;
                <button onClick={() => setNum(num+1)}>num +1</button><br /><br />
                <button onClick={() => setFirst(first+1)}>first +1</button>&emsp;
                <button onClick={() => setSecond(second+1)}>second +1</button>
            </div>
            
            <Child1 first={first} clearFirst={clearFirst}/>

            <Child2 second={second} clearSecond={clearSecond}/>
        </div>
    )
}

export default TestHooks