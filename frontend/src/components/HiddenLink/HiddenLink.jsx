import { useSelector } from "react-redux";



const ShowOnLogin = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.auth);
  
  if(loggedIn){
    return children
  }
  return null
}

export const ShowOnLogout = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.auth);
  
  if(!loggedIn){
    return children
  }
  return null
}

export default ShowOnLogin