import { Message, User, UserSettings, UserSettingsState } from '@/app/redux/reducers';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_BOTS = 'SET_BOTS';
export const SET_USERS = 'SET_USERS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_SCORE = 'SET_SCORE';
export const SET_USER_SETTINGS = 'SET_USER_SETTINGS';

export const addMessage = (message: Message) => ({
	type: ADD_MESSAGE,
	payload: message,
});

export const setBots = (users: User[]) => ({
	type: SET_BOTS,
	payload: users,
});

export const setUsers = (users: User[]) => ({
	type: SET_USERS,
	payload: users,
});

export const setCurrentUser = (currentUser: User) => ({
	type: SET_CURRENT_USER,
	payload: currentUser,
});

export const setScore = (score: number) => ({
	type: SET_SCORE,
	payload: score,
});

export const setUserSettings = (userSettings: UserSettings[]) => ({
	type: SET_USER_SETTINGS,
	payload: userSettings,
});
