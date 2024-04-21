'use client'

import React from 'react';
import { Provider } from 'react-redux';
import SocketComponent from './components/SocketComponent';
import store from './redux/store';
import BettingComponent from '@/app/components/BettingComponent';
import ChatComponent from '@/app/components/ChatComponent';
import RankingComponent from '@/app/components/RankingComponent';
import ChartComponent from '@/app/components/ChartComponent';

const Home: React.FC = () => {
	return (
		<Provider store={store}>
			<main className="wrap">
				<div className="game-wrap">
					<BettingComponent/>
					<ChartComponent/>
				</div>
				<div className="bottom-wrap">
					<RankingComponent />
					<ChatComponent />
				</div>
			</main>
			<SocketComponent/>
		</Provider>
	);
};

export default Home;
