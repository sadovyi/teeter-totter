import React, { useState } from 'react';
import Weight from "./Weight";
import Teeter from "./Teeter";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import RightWeight from "./RightWeight";

const MainWrap = styled.div`
    position: relative;
    padding-top: 300px;
    margin: 0 auto;
    width: 500px;
`;

const PauseBtn = styled.button`
    position: absolute;
    right: 0;
    top: 30px;
    width: 70px;
    height: 40px;
    color: #fff;
    background-color: #0077b6;
    border: none;
    border-radius: 3px;
`;

const Score = styled.div `
    position: absolute;
    top: 30px;
    left: 0;
    font-size: 32px;
    font-weight: 700;
    color: #2b2d42;
    text-shadow: 2px 2px 2px #edf2f4;
`;

export const collection = {
    masses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    types: ['square', 'triangle', 'circle'],
    colors: ['#e63946', '#a8dadc', '#1d3557', '#2a9d8f', '#606c38']
}

export const getRandomEl = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

function App() {
    const [pause, setPause] = useState(false);
    const data = useSelector(state => state);
    const {weights, weightsRight} = data;

    return (
        <MainWrap>
            <Score>Score: {data.score}</Score>
            <Teeter pause={pause}>
                {weights.map((el, idx) => (
                    <Weight pause={pause} key={idx}/>
                ))}
                {weightsRight.map((el, idx) => (
                    <RightWeight key={idx}/>
                ))}
            </Teeter>
            <PauseBtn onClick={() => setPause(prev => !prev)}>Pause</PauseBtn>
        </MainWrap>
    );
}

export default App;
