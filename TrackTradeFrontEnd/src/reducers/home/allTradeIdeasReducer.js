export default (ideas = null, action) => {
    switch (action.type){
        case "FETCH_ALLTRADEIDEAS":
            return (ideas = action.payload);
        default:
            return ideas
    }
}