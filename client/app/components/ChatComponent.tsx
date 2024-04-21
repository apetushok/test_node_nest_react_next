'use client'

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import axios from 'axios';
import styles from '../styles/ChatComponent.module.css'

const ChatComponent: React.FC = () => {
	const messages = useSelector((state: RootState) => state.chat.messages);
	const users = useSelector((state: RootState) => state.users.users);
	const currentUser = useSelector((state: RootState) => state.currentUser.currentUser);

	const [message, setMessage] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await axios.post('http://localhost:5000/message', { userId: currentUser?._id, message });
			setMessage('');
		} catch (error) {
			console.error('Error adding chat message:', error);
		}
	};

	const getUserNameById = (id: string): string => {
		return users.find((user) => user?._id === id )?.username ?? '';
	};

	return (
		<div className="chat">
			<div className={styles.discussion}>
				{messages.map((message: any, index: number) => (
					<div className={`${styles.message} ${ currentUser?._id === message.userId ? styles['current-user'] : ''}`} key={index}>
						<strong>{getUserNameById(message.userId)}:</strong> {message.message}
					</div>
				))}
			</div>
			<form className={styles['chat-form']} onSubmit={handleSubmit}>
				<input
					type="text"
					className={styles['message-input']}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type your message..."
				/>
				<button className={styles.btn} type="submit">Send</button>
			</form>
		</div>
	);
};

export default ChatComponent;
