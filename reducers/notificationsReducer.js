const notification_reducer = (state, action) => {
  if (action.type === "UPDATE_STATE") {
    const { title, message, status } = action.payload;

    return { ...state, title: title, message: message, status: status };
  }
  return state;
};
export default notification_reducer;
