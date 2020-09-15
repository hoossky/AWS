import React from 'react'

import './Capture.css'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ExampleC} from "../ExampleC";


export const CaptureC = () => {
    return (
        <div className={"box"}>
            <DndProvider backend={HTML5Backend}>
                <ExampleC />

            </DndProvider>
        </div>
    )
}