'use client'

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import styles from '../../styles/CurrentRound.module.css'
import axios from 'axios';

export type UsersData = { username: string, points: number, multiplier: number }

const CurrentRound: React.FC = () => {
	const bots = useSelector((state: RootState) => state.bots.users);
	const users = useSelector((state: RootState) => state.users.users);
	const currentUser = useSelector((state: RootState) => state.currentUser.currentUser);
	const [speed, setSpeed] = useState(1);
	const [points, setPoints] = useState(100);
	const [multiplier, setMultiplier] = useState(1.2);
	const [disabledStart, setDisabledStart] = useState(true);
	const [botsData, setBotsData] = useState([]);

	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			try {
				await axios.post('http://localhost:5000/users/settings', {
					userId: currentUser?._id ?? '',
					points,
					multiplier
				});
			} catch (error) {
				console.error('Error generating score:', error);
			}
		}, 350)

		return () => clearTimeout(delayDebounceFn)

	}, [currentUser, points, multiplier]);

	useEffect(() => {
		const tmp: UsersData[] = [];
		bots.forEach( ( user ) => {
			tmp.push({
				username: user?.username ?? '',
				points: Math.floor(Math.random() * 500) + 100,
				multiplier: Math.floor(Math.random() * 1000) + 1.0
			});
		} );

		setBotsData( tmp );
		setDisabledStart(false);
	}, [bots]);

	const handleStart = async () => {
		try {
			await axios.post('http://localhost:5000/generate', {userId: currentUser?._id ?? ''});
		} catch (error) {
			console.error('Error generating score:', error);
		}
	}

	return (
		<div className="current-round">
			<div className={styles.parameters}>
				<div className={styles['number-input']}>
					<label>Points</label>
					<input type="number"
						   min="1"
						   step="1"
						   value={points}
						   onChange={(e) => setPoints(parseInt(e.target.value))}/>
				</div>
				<div className={styles['number-input']}>
					<label>Multiplier</label>
					<input
						type="number"
						min="1"
						step="0.01"
						value={multiplier}
						onChange={(e) => setMultiplier(parseFloat(e.target.value))}/>
				</div>
			</div>
			<button className="btn" onClick={handleStart} disabled={disabledStart}>Start</button>
			<h3>Current round</h3>
			<table className="table">
				<thead>
				<tr>
					<th>Name</th>
					<th>Point</th>
					<th>Multiplier</th>
				</tr>
				</thead>
				<tbody>
				{users.map( (user, index) =>
					<tr key={index}>
						<td>{user?.username ?? ''}</td>
						<td>{user?.points  ?? '-'}</td>
						<td>{user?.multiplier ?? '-' }</td>
					</tr>
				)}
				{botsData.map( (item, index) =>
					<tr key={index}>
						<td>{item.username}</td>
						<td>{item.points === 0 ? '-' : item.points}</td>
						<td>{item.multiplier === 0 ? '-' : item.multiplier}</td>
					</tr>
				)}
				</tbody>
			</table>
			<div className={ styles.slidecontainer }>
				<label>Speed</label>{speed}
				<input type="range"
					   min="1" max="5"
					   className={ styles.slider }
					   value={speed}
					   onChange={(e) => setSpeed(e.target.value)}/>
			</div>
		</div>
	);
};

export default CurrentRound;
