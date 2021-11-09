

const defaultHistory = {
    historee: []
};


export const historyReducer = (state=defaultHistory, action) =>{
    switch (action.type) {
        case "ADD_HISTORY":
            return {...state , historee: [...state.historee, action.payload]}
        case "SORT_HISTORY":
            return {...state, historee: [...state.historee.sort((a, b) => a[action.payload] - b[action.payload] ? 1 : -1)]}

        default:
            return state
    }
}