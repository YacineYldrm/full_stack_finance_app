// -------------------------Imports---------------------------

import './TransactionDay.scss';

import { Transaction, useState } from '../../utils/files';
import { useEffect } from 'react';

// -------------------------Imports---------------------------

const TransactionDay = ({ date, transactions, provider }) => {
	const [renderTransactions, setRenderTransactions] = useState([]);
	const newdate = new Date(date);

	// --------------------Triggers on render--------------------
	//                Sets the weeks Day of group
	// ----------------------------------------------------------

	const getDay = () => {
		if (newdate.toString().slice(0, 3) === 'Mon') {
			return 'Monday';
		} else if (newdate.toString().slice(0, 3) === 'Tue') {
			return 'Tuesday';
		} else if (newdate.toString().slice(0, 3) === 'Wed') {
			return 'Wednesday';
		} else if (newdate.toString().slice(0, 3) === 'Thu') {
			return 'Thursday';
		} else if (newdate.toString().slice(0, 3) === 'Fri') {
			return 'Friday';
		} else if (newdate.toString().slice(0, 3) === 'Sat') {
			return 'Saturday';
		} else if (newdate.toString().slice(0, 3) === 'Sun') {
			return 'Sunday';
		}
	};

	// --------------------Triggers render-----------------------
	//    filters the transactios based on day of each Transaction
	// ----------------------------------------------------------

	const filteredTransactions = transactions?.filter((transaction) => {
		return (
			new Date(transaction.date - new Date().getTimezoneOffset() * 60000)
				.toISOString()
				.slice(0, 10) === date
		);
	});

	// --------------------Triggers on click-----------------------
	//    toggles the show and disapear class of delete Button
	// ----------------------------------------------------------
	const ToggleDeleteBtn = () => {
		const group = document.getElementById(date);
		group.classList.toggle('showDeleteBtn');
	};

	useEffect(() => {
		setRenderTransactions(filteredTransactions);
	}, []);

	// ---------------------------------------------------------------------

	return (
		<>
			<main className='transactionsDay'>
				<div className='groupInfo'>
					<div>
						<h6>{getDay()}</h6>
						<h5>
							{newdate
								.toISOString()
								.replace(/T.*/, '')
								.split('-')
								.reverse()
								.join('-')}
						</h5>
					</div>
					<div onClick={() => ToggleDeleteBtn()}>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>

				<div id={date}>
					{renderTransactions
						.sort(
							(transOne, transTwo) =>
								transTwo.date - transOne.date,
						)
						.map((transaction) => (
							<Transaction
								provider={provider}
								_delete={true}
								key={transaction._id}
								transaction={transaction}
								setRenderTransactions={setRenderTransactions}
							/>
						))}
				</div>
			</main>
		</>
	);
};

export default TransactionDay;
