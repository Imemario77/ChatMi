const groupReducer = (
   state = { groupData: false, loading: false, error: false },
   action
) => {
   switch (action.type) {
      case "GROUP_STARTED":
         return {
            ...state,
            groupData: false,
            loading: true,
            error: false,
         };
      case "GROUP_FINISHED":
         return {
            ...state,
            groupData: true,
            loading: false,
            error: false,
            
         };
      case "GROUP_FAILED":
         return {
            ...state,
            groupData: false,
            error: true,
            loading: false,
         };
         break;

      default:
         return state;
   }
};

export default groupReducer;
