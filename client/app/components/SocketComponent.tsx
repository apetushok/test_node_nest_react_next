'use client'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setCurrentUser, setScore, setUsers, setUserSettings } from '../redux/actions';
import { RootState } from '@/app/redux/store';
import { User } from '@/app/redux/reducers';

const SocketComponent: React.FC = () => {
	const dispatch = useDispatch();
	const users = useSelector((state: RootState) => state.users.users);
	const usersSettings = useSelector((state: RootState) => state.userSettings.userSettings);

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:5000');

		socket.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);
			if (data.type === 'message') {
				dispatch(addMessage( { userId: data.userId, message: data.message }));
			} else if (data.type === 'score') {
				dispatch(setScore(data.score));
			} else if (data.type === 'addUser') {
				console.log('users')
				console.log(users)
				console.log(data)


				dispatch(setUsers(data.users));
			} else if (data.type === 'userSettings') {
				dispatch(setUserSettings([...usersSettings, { userId: data.userId, ...data.userSettings}]));
			}
		});

		return () => {
			socket.close();
		};
	}, [dispatch]);

	return (
		<></>
	);
};

export default SocketComponent;
