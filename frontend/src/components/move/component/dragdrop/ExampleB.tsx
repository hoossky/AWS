import React, { useState, useCallback } from 'react'
import {ContainerB} from './ContainerB'

export const ExampleB: React.FC = () => {
    const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
    const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
        hideSourceOnDrag,
    ])

    return (
        <div>
            <ContainerB hideSourceOnDrag={hideSourceOnDrag} />
        </div>
    )
}