import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import SetupAccount from './pages/SetupAccount/SetupAccount';
import Login from './pages/Login/Login';
import { silentRefresh } from './utils/refresh';
import AddIncome from './pages/AddIncome/AddIncome';
import AddExpense from './pages/AddExpense/AddExpense';
import AllTransaction from './pages/AllTransaction/AllTransaction';
import Navbar from './components/Navbar/Navbar';
import Verify from './pages/Verify/Verify';
import Menu from './pages/Menu/Menu';

function App() {
	// #################################################
	const [authorization, setAuthorization] = useState(null);
	const [activeUser, setActiveUser] = useState('');
	const [accounts, setAccounts] = useState([]);
	const [account, setAccount] = useState({});
	const [transactions, setTransactions] = useState([]);

	const provider = {
		authorization,
		setAuthorization,
		activeUser,
		setActiveUser,
		accounts,
		setAccounts,
		account,
		setAccount,
		transactions,
		setTransactions,
	};
	// ############### Refresh Token on pagereload ###############

	useEffect(() => {
		if (!authorization)
			silentRefresh(null, setAuthorization, setActiveUser);
	}, []);

	// #################################################
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Home provider={provider} />}
					/>

					<Route
						path='/register'
						element={<Register provider={provider} />}
					/>
					<Route
						path='/account/setup'
						element={<SetupAccount provider={provider} />}
					/>
					<Route
						path='/login'
						element={<Login provider={provider} />}
					/>
					<Route
						path='/add-income'
						element={<AddIncome provider={provider} />}
					/>
					<Route
						path='add-expense'
						element={<AddExpense provider={provider} />}
					/>
					<Route
						path='/all-transactions'
						element={<AllTransaction provider={provider} />}
					/>
					<Route path='/verify/:userId' element={<Verify/>}/>
					<Route path='/menu' element={<Menu provider={provider}/>}/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
