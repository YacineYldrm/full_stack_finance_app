import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';

function App() {
	const [authorization, setAuthorizsation] = useState('');
	const [activeUser, setActiveUser] = useState('');
	const [accounts, setAcconts] = useState([]);
	const [account, setAccont] = useState({});
	const [transactions, setTransactions] = useState([]);

	const provider = {
		authorization,
		setAuthorizsation,
		activeUser,
		setActiveUser,
		accounts,
		setAcconts,
		account,
		setAccont,
		transactions,
		setTransactions,
	};

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Home provider={provider} />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
