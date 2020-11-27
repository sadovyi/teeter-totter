export function changeWeight(weight, position) {
    return {
        type: 'CHANGE_WEIGHT',
        payload: {
            weight: weight,
            position: position
        }
    }
}

export function addWeight(weight) {
    return {
        type: 'ADD_WEIGHT',
        payload: {
            weights: weight,
        }
    }
}

export function changeRightWeight(weight, position) {
    return {
        type: 'CHANGE_RIGHT_WEIGHT',
        payload: {
            weight: weight,
            position: position
        }
    }
}

export function addRightWeight(weight) {
    return {
        type: 'ADD_RIGHT_WEIGHT',
        payload: {
            weight: weight,
        }
    }
}

export function addScore(payload) {
    return {
        type: 'ADD_SCORE',
        payload: payload
    }
}

export const changeAngle = (angle) => {
    return dispatch => {
        dispatch({
            type: 'CHANGE_ANGLE',
            payload: {
                angle: angle,
            }
        })
    }
}