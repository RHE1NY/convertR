

const defaultState = {
    history: []
};


export const historyReducer = (state=defaultState, action) =>{
    switch (action.type) {
        case "ADD_HISTORY":
            return {...state , history: [...state.history, action.payload]}
        case "SORT_HISTORY":
            return {...state, history: [...state.history.sort((a, b) => a[action.payload] - b[action.payload] ? 1 : -1)]}

        default:
            return state
    }
}
