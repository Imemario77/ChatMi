import "./addChat.css";
import { useDispatch, useSelector } from "react-redux";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useState, useEffect } from "react";
import Image from "../images/Image";
import { findUsers } from "../Action/getUserAction.js";

function AddChat() {
   const [noResult, setNoResult] = useState(true); // handle the result from api of no user or user
   const dispatch = useDispatch();
   const [searchInput, setSearchInput] = useState(""); //  set search text Input
   const [searchResult, setSearchResult] = useState(null);
   const user = useSelector((state) => state.authreducer.authData);

   function handleSearch(event) {
      setSearchInput(event.target.value);
   }

   const searching = useSelector((state) => state.searchreducer.searching);

   //  search function
   useEffect(() => {
      async function currentSearch() {
         dispatch({ type: "SEARCH_BEGINGS" });
         const result = await findUsers(searchInput); //get found users from api
         // update the found user and check if no use is found
         if (searchInput.length === 0) {
            setNoResult(true);
            setSearchResult(null);
         }
         if (result) {
            if (result.data.found.length === 0) {
               setNoResult(true);
            }
         }
         if (searchInput.length > 0) {
            if (result) {
               if (result.data) {
                  dispatch({ type: "SEARCH_ENDES" });
                  if (result.data.found.length > 0) {

                     setSearchResult(result.data.found);
                     setNoResult(false);
                     // console.log(result.data.found.length);
                  } else {
                     setSearchResult(null);
                  }
               }
            }
         }
      }
      currentSearch();
   }, [searchInput]);
   return (
      <div className="AddChat">
         <div className="back-search">
            <a href="/">
               <BiLeftArrowAlt className="AddChatArrow" />
            </a>
            <input
               onChange={handleSearch}
               type="text"
               placeholder="Search...."spellcheck="false"
            />
         </div>
         <div style={{ margin: "60px 0 0 " }}>
            {!noResult ? (
               searchResult &&
               searchResult.map((searched) => {
                  if (searched._id !== user._id)
                     return (
                        <a
                           className="searchedAnchorTag"
                           href={`/Chatroom/${searched._id}`}
                        >
                           <div className="searchResult">
                              <Image class="searchResultImage" />
                              <span>{searched.userName}</span>
                           </div>
                        </a>
                     );
               })
            ) : (
               <div className="NoResult">
                  {noResult && searchInput && (
                     <span>
                        {searching
                           ? `searching for "${searchInput}"`
                           : `No result found for "${searchInput}"`}
                     </span>
                  )}
               </div>
            )}
         </div>
      </div>
   );
}

export default AddChat;
