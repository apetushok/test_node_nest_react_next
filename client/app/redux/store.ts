import { combineReducers } from 'redux';
import {
	botsReducer,
	chatReducer,
	ChatState,
	currentUserReducer,
	CurrentUserState, scoreReducer,
	ScoreState, userSettingsReducer, UserSettingsState,
	usersReducer,
	UsersState
} from './reducers';
import { configureStore } from '@reduxjs/toolkit';

export interface RootState {
	chat: ChatState;
	bots: UsersState;
	users: UsersState;
	currentUser: CurrentUserState;
	score: ScoreState;
	userSettings: UserSettingsState;
}

const rootReducer = combineReducers<RootState>({
	chat: chatReducer,
	bots: botsReducer,
	users: usersReducer,
	currentUser: currentUserReducer,
	score: scoreReducer,
	userSettings: userSettingsReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
