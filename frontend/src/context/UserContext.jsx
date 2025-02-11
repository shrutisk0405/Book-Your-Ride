import React, { createContext,useState } from 'react'

export const UserDataContext=createContext();

const UserContext = ({children}) => {
  const [user, setUser] = useState({
    email:'',
    fullname:{
      firstname:'',
      lastname:''
    },

  })
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const updateUser = (userData) => {
  //   setUser(userData);
  // };

  // const value = {
  //   user,
  //   setUser,
  //   isLoading,
  //   setIsLoading,
  //   error,
  //   setError,
  //   updateUser,
  // };
  return (
    <div>
      <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
    </div>
  )
}

export default UserContext