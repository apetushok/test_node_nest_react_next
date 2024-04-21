'use client'

import React from 'react';
import styles from '../styles/ChartComponent.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

const ChartComponent: React.FC = () => {
	const currentUser = useSelector((state: RootState) => state.currentUser.currentUser);
	const score = useSelector((state: RootState) => state.score.score);

	return (
		<div className="chart">
			<div className={styles.statistics}>
				<div className={styles.item}>Score: 0</div>
				<div className={styles.item}>Name: {currentUser?.username ?? ''}</div>
				<div className={styles.item}>Time: 10:00</div>
			</div>
			<div className={styles.graph}>
				{ !currentUser
					? '0.00x'
					: ( currentUser && score === 0 ? '...' : score+'x' )
				}
			</div>
		</div>
	);
};

export default ChartComponent;
