import React, { useState, useCallback } from 'react'
import {ContainerA} from './ContainerA'

export const ExampleA: React.FC = () => {
    const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
    const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
        hideSourceOnDrag,
    ])

    return (
        <div>
            <ContainerA hideSourceOnDrag={hideSourceOnDrag} />
        </div>
    )
}