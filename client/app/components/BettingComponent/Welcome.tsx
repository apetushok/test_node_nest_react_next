'use client'

import styles from '../../styles/Welcome.module.css'
import React, { useState } from 'react';
import { setBots, setCurrentUser, setUsers } from '@/app/redux/actions';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Welcome = () => {
	const [username, setUsername] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (username !== ''){
				const res = await axios.get('http://localhost:5000/users/'+username);
				const { bots, users, user } = res.data;

				console.log(users)

				dispatch(setBots(bots));
				dispatch(setUsers(users));
				dispatch(setCurrentUser(user));

				setUsername('');
			}
		} catch (error) {
			console.error('Error adding chat message:', error);
		}
	};

	return (
		<div className={styles.welcome}>
			<h2>Welcome</h2>
			<form onSubmit={handleSubmit} className={styles['user-name-wrap']}>
				<small>Please insert your name</small>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Type your username..."
				/>
				<button type="submit" className="btn">Accept</button>
			</form>
		</div>
	);
};

export default Welcome;