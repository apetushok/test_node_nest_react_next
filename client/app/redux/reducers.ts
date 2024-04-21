import { ADD_MESSAGE, SET_BOTS, SET_CURRENT_USER, SET_SCORE, SET_USER_SETTINGS, SET_USERS } from './actions';

export type Message = { userId: string, message: string }
export type User = { _id: string, username: string } | null;
export type UserSettings = { userId: string, points: number, multiplier: number } | null;

export interface ChatState {
	messages: Message[];
}

export interface UsersState {
	users: User[];
}

export interface CurrentUserState {
	currentUser: User;
}

export interface UserSettingsState {
	userSettings: UserSettings[];
}

export interface ScoreState {
	score: number;
}

export const chatReducer = (state: ChatState = { messages: [] }, action: any) => {
	switch (action.type) {
		case ADD_MESSAGE:
			return {
				...state,
				messages: [...state.messages, action.payload],
			};
		default:
			return state;
	}
};

export const botsReducer = (state: UsersState = { users: [] }, action: any) => {
	switch (action.type) {
		case SET_BOTS:
			return {
				...state,
				users: action.payload,
			};
		default:
			return state;
	}
};

export const usersReducer = (state: UsersState = { users: [] }, action: any) => {
	switch (action.type) {
		case SET_USERS:
			return {
				...state,
				users: action.payload,
			};
		default:
			return state;
	}
};

export const currentUserReducer = (state: CurrentUserState = { currentUser: null }, action: any) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
			};
		default:
			return state;
	}
};

export const scoreReducer = (state: ScoreState = { score: 0 }, action: any) => {
	switch (action.type) {
		case SET_SCORE:
			return {
				...state,
				score: action.payload,
			};
		default:
			return state;
	}
};

export const userSettingsReducer = (state: UserSettingsState = { userSettings: [] }, action: any) => {
	switch (action.type) {
		case SET_USER_SETTINGS:
			return {
				...state,
				userSettings: action.payload,
			};
		default:
			return state;
	}
};
