import React, { Fragment, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { useCapture } from './capture/index'
import {CaptureA} from './capture/CaptureA'

const Wrapper = styled.div`
  text-align: center;
`
const Headline = styled.h1`
  font-family: 'Open Sans Condensed', sans-serif;
  font-weight: 700;
`


const ComponentWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto ;
  
  
`
const Button = styled.input.attrs({ type: 'button' })``
const SquareA=()=> {
    const { snap } = useCapture()
    const element = useRef(null)
    const onClick = useCallback(() => {
        snap(element, { file: 'download.png' })
    }, [snap, element])
    return (
        <div className="App">
            <Fragment>
                <Wrapper>
                    <Headline>캡쳐</Headline>
            <ComponentWrapper ref={element}>
    <CaptureA/>
    </ComponentWrapper>
    <br/>
    <br/>
    <Button onClick={onClick} value="캡쳐하고 다운받기" />
        </Wrapper>
        </Fragment>

        </div>
)
}

export default SquareA;