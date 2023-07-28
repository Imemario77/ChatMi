const authReducer = (
   state = { authData: null, loading: false, error: false },
   action
) => {
   switch (action.type) {
      case "AUTH_STARTED":
         return {
            ...state,
            loading: true,
            error: false,
         };
      case "AUTH_FINISHED":
         return {
            ...state,
            authData: action.data,
            loading: false,
            error: false,
         };
      case "AUTH_FAILED":
         return {
            ...state,
            error: true,
            loading: false,
         };
         break;

      default:
         return state;
   }
};

export default authReducer;
