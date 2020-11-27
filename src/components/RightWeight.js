import React, { useCallback, useEffect, memo } from 'react';
import { WeightBody } from "./Weight";
import {useDispatch} from "react-redux";
import { changeRightWeight } from "../reducers/actions";
import styled from  'styled-components';
import {collection, getRandomEl} from "./App";

const RightWeightStyled = styled(WeightBody) `
    position: absolute;
    left: auto;
    right: 0;
    bottom: 0;
`;

const RightWeight = memo(() => {
    const dispatch = useDispatch();

    const type = useCallback(getRandomEl(collection.types), []);
    const mass = useCallback(getRandomEl(collection.masses), []);
    const color = useCallback(getRandomEl(collection.colors), []);

    useEffect(() => {
        dispatch(changeRightWeight(mass))
    }, []);

    return (
        <RightWeightStyled
            color={color}
            type={type}
            mass={mass}
            style={{
                right: Math.random() * (150),
            }}
        >
            {mass} Kg
        </RightWeightStyled>
    )
})

export default RightWeight;