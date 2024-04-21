'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import Welcome from '@/app/components/BettingComponent/Welcome';
import CurrentRound from '@/app/components/BettingComponent/CurrentRound';

const BettingComponent: React.FC = () => {
	const currentUser = useSelector((state: RootState) => state.currentUser.currentUser);

	return (
		<div className="settings">
			{currentUser ?
				<CurrentRound/>
				:
				<Welcome/>
			}
		</div>
	);
};

export default BettingComponent;
