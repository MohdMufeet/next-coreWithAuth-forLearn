"use client"
import { createContext, useContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = (props) =>{
 const [user,setUser] = useState({name:"",email:""});
  return(<>
      <UserContext.Provider value={{user,setUser}}>
      {props.children}
      </UserContext.Provider>
  </>)
};

export const user =()=>{
  return useContext(UserContext);
}


















// "use client"

// import { createContext, useState ,useContext } from "react";

// export const UserContext = createContext(null);

// export const UserProvider=(props)=>{

//   const [user,setUser]=useState(3);

//   return(<>
//   <UserContext.Provider value={{user,setUser}}>
//         {props.children}
//   </UserContext.Provider>
//   </>)
 
// }
// export const user=()=>{
//   return useContext(UserContext)
// }

// "use client";

// import { createContext, useState } from "react";

// // ✅ Capitalize context name for convention
// const UserContext = createContext();

// // ✅ Fix component name capitalization and props destructuring
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // ✅ Add default value

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };