import React from "react"

interface Props {
    first: number,
    clearFirst?: () => void
}

const Child1: React.FC<Props> = ({ first }) => {
    console.log(first, '----- Child1 render ----- frist ----')
    return (
        <div style={{ height: '100px', margin: '10px 0', padding: '0 10px', border: '1px solid pink' }}>
            <h3>Child1:</h3>
            <span>first : {first}</span>
        </div>
    )
}

// memo 解决重复渲染问题
export default React.memo(Child1) 