const messageReducer = (
   state = { messageData: null, sending: false, finished: false },
   action
) => {
   switch (action.type) {
      case "GETMESSAGES_STARTED":
         return {
            ...state,
            sending: true,
            finished: false,
         };
      case "GETMESSAGES_ENDED":
         return { ...state,messageData:action.data, sending: false, finished: true };
         break;

      default:
         return state;
   }
};

export default messageReducer;
