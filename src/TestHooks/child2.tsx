import React from "react"

interface Props {
    second: number,
    clearSecond: () => void
}

const Child2: React.FC<Props> = ({ second, clearSecond }) => {
    console.log(second, '----- Child2 render ----- second ----')
    return (
        <div style={{ height: '100px', margin: '10px 0', padding: '0 10px', border: '1px solid pink' }}>
            <h3>Child2</h3>
            <span>second : {second}</span>&emsp;
            <button onClick={clearSecond}>清零</button>
        </div>
    )
}

export default React.memo(Child2)