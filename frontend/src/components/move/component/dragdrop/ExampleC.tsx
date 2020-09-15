import React, { useState, useCallback } from 'react'
import {ContainerC} from './ContainerC'

export const ExampleC: React.FC = () => {
    const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
    const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
        hideSourceOnDrag,
    ])

    return (
        <div>
            <ContainerC hideSourceOnDrag={hideSourceOnDrag} />
        </div>
    )
}