const searchReducer = (
   state = { searching: false, doneSearching: false },
   action
) => {
   switch (action.type) {
      case "SEARCH_BEGINGS":
         return {
            ...state,
            searching: true,
            doneSearching: false,
         };
      case "SEARCH_ENDES":
         return { ...state, searching: false, doneSearching: true };
         break;

      default:
         return state;
   }
};

export default searchReducer;
