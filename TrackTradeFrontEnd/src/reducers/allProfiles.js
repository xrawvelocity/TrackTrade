export default (traders = null, action) => {
    switch (action.type){
        case "FETCH_ALLUSERS":
            return (traders = action.payload);
        default:
            return traders
    }
}
