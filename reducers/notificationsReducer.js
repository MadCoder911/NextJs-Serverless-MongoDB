const notification_reducer = (state, action) => {
  if (action.type === "UPDATE_STATE") {
    const { title, message, status, show } = action.payload;

    return {
      ...state,
      title: title,
      message: message,
      status: status,
      show: show,
    };
  }
  return state;
};
export default notification_reducer;
