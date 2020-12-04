import React, { useEffect, memo } from 'react';
import { WeightBody } from "./Weight";
import { useDispatch } from "react-redux";
import { changeRightWeight } from "../reducers/actions";
import styled from 'styled-components';
import { collection, getRandomEl } from "./App";

const RightWeightStyled = styled(WeightBody)`
    position: absolute;
    left: auto;
    right: 0;
    bottom: 0;
`;

const RightWeight = memo(function RightWeight() {
    const dispatch = useDispatch();

    const mass = getRandomEl(collection.masses);
    const type = getRandomEl(collection.types);
    const color = getRandomEl(collection.colors);
    const position = Math.random() * (150);

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            dispatch(changeRightWeight(mass))
        }

        return () => isMounted = false;

    }, [mass, dispatch]);

    return (
        <RightWeightStyled
            color={color}
            type={type}
            mass={mass}
            style={{
                right: position,
            }}
        >
            {mass} Kg
        </RightWeightStyled>
    )
})

export default RightWeight;