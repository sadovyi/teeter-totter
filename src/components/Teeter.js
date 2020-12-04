import React, { useState, useEffect, useRef, memo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { changeAngle } from "../reducers/actions";
import GameOver from "./GameOver";

const TeeterBody = styled.div`
    
`;

const TeeterTop = styled.div`
    width: 500px;
    height: 6px;
    border-bottom: 3px solid #0077b6;
    border-left: 3px solid #0077b6;
    border-right: 3px solid #0077b6;
    transform: rotate(${props => props.angle}deg);
    transition: transform ease-out .8s;
`;

const TeeterBottom = styled.div`
    margin: 0 auto;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #0077b6;
    border: 2px dotted #fff;
`;

const Teeter = memo(function Teeter({children, pause}) {
    const [angle, setAngle] = useState(0);
    const ref = useRef(null);
    const data = useSelector(state => state);
    const {leftStack, rightStack} = data;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!pause) {
            const currentAngle = checkAngle(leftStack.weight, rightStack.weight);
            newAngle(currentAngle, angle);

            // console.log(`${leftStack.weight * 100} weight`)
            // console.log(`${leftStack.position / 2} position`)
        }

    }, [leftStack, rightStack, angle, pause])

    useEffect(() => {
        dispatch(changeAngle(angle))
    }, [angle, dispatch])

    const checkAngle = (left, right) => {
        if (left > right) {
            return -(left - right) * 3;
        } else if (left < right) {
            return (right - left) * 3;
        } else {
            return 0;
        }
    }

    const newAngle = (curAngle, prevAngle) => {
        if (curAngle < prevAngle && curAngle !== prevAngle) {
            setAngle(prev => prev - 1)
        } else if (curAngle > prevAngle && curAngle !== prevAngle) {
            setAngle(prev => prev + 1)
        }
    }

    if (leftStack.weight > 50) {
        return <GameOver/>
    }

    if (angle > 35 || angle < -35) {
        return <GameOver/>
    }

    return (
        <TeeterBody>
            <TeeterTop angle={angle} ref={ref}>{children}</TeeterTop>
            <TeeterBottom/>
        </TeeterBody>
    )
})

export default Teeter;