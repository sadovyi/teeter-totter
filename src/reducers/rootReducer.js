export const initialState = {
    state: 0,
    pause: false,
    weights: [1],
    weightsRight: [1],
    angle: 0,
    score: 0,
    leftStack: {
        weight: 0,
        position: 0
    },
    rightStack: {
        weight: 0,
        position: 0
    },
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_WEIGHT':
            const oldWeight = state.leftStack.weight;
            const newWeight = action.payload.weight
            return {
                ...state, leftStack: {
                    weight: oldWeight + newWeight,
                    position: action.payload.position
                }
            }
        case 'ADD_WEIGHT':
            return {...state, weights: [...state.weights, action.payload]}
        case 'ADD_RIGHT_WEIGHT':
            return {...state, weightsRight: [...state.weightsRight, action.payload]}
        case 'CHANGE_RIGHT_WEIGHT':
            const oldWeightRight = state.rightStack.weight;
            const newWeightRight = action.payload.weight
            return {
                ...state, rightStack: {
                    weight: oldWeightRight + newWeightRight,
                    position: action.payload.position
                }
            }
        case 'TOGGLE_PAUSE':
            return {...state, pause: true}
        case 'CHANGE_ANGLE':
            return {...state, angle: action.payload}
        case 'ADD_SCORE':
            return {...state, score: state.score + action.payload}
        default:
            initialState.state = 0
            return state;
    }
}