import React, {useCallback, useState} from 'react'

import './Capture.css'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import {ExampleB} from "../ExampleB";

export const CaptureB = () => {
    return (
        <div className={"box"}>
            <DndProvider backend={HTML5Backend}>
                <ExampleB/>
            </DndProvider>
        </div>
    )
}
