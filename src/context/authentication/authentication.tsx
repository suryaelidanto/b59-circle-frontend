import React, { createContext, useContext, useReducer } from 'react';
import { Actions, ActionTypes } from './authentication.type';

type State = {
  username: string;
  email: string;
  fullName: string;
  address: string;
};

type AuthContext = {
  state: State;
  dispatch: React.Dispatch<Actions>;
};

const AuthContext = createContext<AuthContext | null>(null);

const initialState: State = {
  username: 'adsf',
  email: 'adsf@gmail.com',
  address: 'depok',
  fullName: 'adfffff',
};

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATION:
      return { ...state, ...action.payload };
    default:
      throw new Error('Context action not available!');
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
