export enum ActionTypes {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
}

export type AddAction = {
  type: ActionTypes.ADD;
};

export type SubtractAction = {
  type: ActionTypes.SUBTRACT;
};

export type Actions = AddAction | SubtractAction;
