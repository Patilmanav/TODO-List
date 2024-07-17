import React from "react";
import { faPalette,faPen } from "@fortawesome/free-solid-svg-icons";
// import { faSmile } from '@fortawesome/free-regular-svg-icons';
// import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect,useState } from "react";


function Navbar(props) {
  // Step 1: Set up state to manage the visibility of the list
  const [isListVisible, setIsListVisible] = useState(false);

  // Step 2: Toggle the visibility of the list
  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    
      <nav className="w-full md:text-center text-end md:py-5 p-5">

       {
        isListVisible?
        <button onClick={()=>{toggleListVisibility();props.setTheme("dark");}} className="">
        <FontAwesomeIcon icon={faPalette} size="2x" color="blue" className="hover:text-blue-500" />
      </button>
      :
      <button onClick={()=>{toggleListVisibility();props.setTheme("light");}} className="">
      <FontAwesomeIcon icon={faPen} size="2x" color="blue" className="hover:text-blue-500" />
    </button>
       }

      </nav>
  );
}

export default Navbar;
