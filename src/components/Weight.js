import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { changeWeight, addWeight, addScore } from "../reducers/actions";
import { collection } from "./App";
import { getRandomEl } from "./App";

export const WeightBody = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: calc(50px + ${props => props.mass}px * 3);
    height: calc(50px + ${props => props.mass}px * 3);
    transition: left transform ease .2s;
    display: flex;
    align-items: ${props => props.type === 'triangle' ? 'flex-end' : 'center'};
    justify-content: center;
    color: #ffffff;
    font-weight: 900;
    line-height: 2;
    text-shadow: 0 2px 2px #333333;
    box-shadow: ${props => props.type === 'triangle' ? 'none' : '0 0 6px inset #ffffff'};
    background-color: ${props => props.type === 'triangle' ? 'transparent' : props.color};
    border-radius: ${(props) => props.type === 'circle' && 50}%;
    &::before {
        content: '';
        z-index: -1;
        position: absolute;
        display: ${props => props.type !== 'triangle' ? 'none' : 'block'};
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 30px 70px 30px;
        border-color: transparent transparent ${props => props.color} transparent;
        background-color: transparent;
    }
})}`;

const Weight = memo(function Weight({pause}) {
    const [fly, setFly] = useState(true);
    const [verticalPosition, setVerticalPosition] = useState(-400);
    const [horizontalPosition, setHorizontalPosition] = useState(Math.ceil(Math.random() * (150)));
    const dispatch = useDispatch();

    const type = useCallback(getRandomEl(collection.types), []);
    const mass = useCallback(getRandomEl(collection.masses), []);
    const color = useCallback(getRandomEl(collection.colors), []);

    const stateRef = useRef(horizontalPosition);

    useEffect(() => {
        stateRef.current = horizontalPosition;
    }, [horizontalPosition])

    const changeHorizontal = useCallback((e) => {

        if (e.key === "ArrowLeft" && stateRef.current > 0) {
            setHorizontalPosition(prev => prev - 7);
        }

        if (e.key === "ArrowRight" && stateRef.current < 150) {
            setHorizontalPosition(prev => prev + 7);
        }

    }, []);

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            if (!pause) {
                if (verticalPosition !== 0) {
                    setTimeout(() => setVerticalPosition(verticalPosition + 1), 6)
                } else {
                    setFly(false);
                    dispatch(addWeight(prev => prev++));
                    dispatch(changeWeight(mass, horizontalPosition));
                    dispatch(addScore(1));
                }
            }
        }

        return () => isMounted = false
    }, [verticalPosition, dispatch, pause, mass, horizontalPosition])

    useEffect(() => {
        let isMounted = true;

        if (isMounted && fly) {
            window.addEventListener('keydown', changeHorizontal);
        } else if (isMounted && !fly) {
            window.removeEventListener('keydown', changeHorizontal);
        }

        return () => {
            isMounted = false;
        }

    }, [fly, changeHorizontal])

    return (
        <WeightBody
            style={{
                top: `calc(-50px + -${mass}px * 3)`,
                transform: `translateY(${verticalPosition}%)`,
                left: `${horizontalPosition}px`,
            }}
            color={color}
            type={type}
            mass={mass}
            verticalPosition={verticalPosition}
            horizontalPosition={horizontalPosition}
        >
            {mass} Kg
        </WeightBody>
    )
})

export default Weight;