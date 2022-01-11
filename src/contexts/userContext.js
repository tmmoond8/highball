import React from 'react';
import * as userUtils from '../libs/users';

const UserContext = React.createContext(null);

export function UserContextProvider({children}) {
  const [user, setUser] = React.useState(null);
  const report = async postId => {
    if (!user) return;
    const reports = await userUtils.addReport({id: user.id, postId});
    setUser({
      ...user,
      reports,
    });
  };
  const unreport = async postId => {
    if (!user) return;
    const reports = await userUtils.removeReport({id: user.id, postId});
    setUser({
      ...user,
      reports,
    });
  };
  return (
    <UserContext.Provider
      children={children}
      value={{user, setUser, report, unreport}}
    />
  );
}

export function useUserContext() {
  const userContext = React.useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext.Provider is not found');
  }
  return userContext;
}
