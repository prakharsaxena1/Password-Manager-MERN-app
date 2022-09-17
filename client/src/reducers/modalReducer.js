const initialState = false;
const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_MODAL":
            return true;
        case "HIDE_MODAL":
            return false;
        default:
            return state;
    }
}


export default modalReducer;