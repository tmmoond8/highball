import React from 'react';

const UserContext = React.createContext(null);

export function UserContextProvider({children}) {
  const [user, setUser] = React.useState(null);
  return <UserContext.Provider children={children} value={{user, setUser}} />;
}

export function useUserContext() {
  const userContext = React.useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext.Provider is not found');
  }
  return userContext;
}
