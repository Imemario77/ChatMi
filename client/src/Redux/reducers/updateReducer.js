const updateReducer = (
   state = { updateData: null, loading: false, error: false },
   action
) => {
   switch (action.type) {
      case "UPDATE_STARTED":
         return {
            ...state,
            loading: true,
            error: false,
         };
      case "UPDATE_FINISHED":
         return {
            ...state,
            updateData: action.data,
            loading: false,
            error: false,
         };
      case "UPDATE_FAILED":
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

export default updateReducer;
