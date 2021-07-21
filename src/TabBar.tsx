import React, { useState } from 'react'

import './tab.css'
import TestTodos from './TestTodos'
import TestHooks from './TestHooks'

const TabBar: React.FC = () => {
    const [flag, setFlag] = useState(true)
    console.log(flag, 'flag ======')
    return (
        <div>
            {flag ? <TestTodos/> : <TestHooks />}
            <div className="fixWrap">
                <div className="fixBtn" onClick={() => setFlag(true)}>Todos</div>
                <div className="fixBtn" onClick={() => setFlag(false)}>Hooks</div>
            </div>
        </div>
    )
}

export default TabBar
