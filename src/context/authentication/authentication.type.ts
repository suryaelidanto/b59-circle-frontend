export enum ActionTypes {
  SET_AUTHENTICATION = 'SET_AUTHENTICATION',
}

export type SetAuthenticationAction = {
  type: ActionTypes.SET_AUTHENTICATION;
  payload: {
    username: string;
    email: string;
    fullName: string;
    address: string;
  };
};

export type Actions = SetAuthenticationAction;
