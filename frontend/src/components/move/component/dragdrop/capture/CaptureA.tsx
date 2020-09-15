import React  from 'react'

import './Capture.css'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ExampleA} from "../ExampleA";


export const CaptureA = () => {
    return (
        <div className={"box"}>
            <DndProvider backend={HTML5Backend}>
                <ExampleA />

            </DndProvider>
        </div>
    )
}