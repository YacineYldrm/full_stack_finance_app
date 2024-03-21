// -------------------------Imports---------------------------

import './Transaction.scss';
import deleteIcon from '../../../public/transactionIcons/deleteIcon.svg';

import {
	useState,
	backendUrl,
	food,
	shopping,
	insurance,
	otherExpense,
	otherIncome,
	rent,
	salary,
	Button,
} from '../../utils/files';
import { useEffect } from 'react';

// -------------------------Imports---------------------------

const Transaction = ({
	provider,
	transaction,
	_delete,
	setRenderTransactions,
}) => {
	// -------------------------States---------------------------

	const [showModal, setShowModal] = useState(false);

	// ------------Triggers on component render-----------------
	//    sets the Category Icon for Transaction
	// ----------------------------------------------------------

	const getIcon = () => {
		if (transaction?.category === 'Food & Drink') {
			return food;
		} else if (transaction?.category === 'Shopping') {
			return shopping;
		} else if (transaction?.category === 'Insurance bill') {
			return insurance;
		} else if (transaction?.category === 'Rent') {
			return rent;
		} else if (transaction?.category === 'Other Expense') {
			return otherExpense;
		} else if (transaction?.category === 'Salary') {
			return salary;
		} else if (transaction?.category === 'Other Icome') {
			return otherIncome;
		} else if (
			transaction?.category === '' &&
			transaction?.type === 'expense'
		) {
			return otherExpense;
		} else {
			return otherIncome;
		}
	};

	// --------------------Triggers on click-----------------------
	//   sends the transaction Id to the server to find and delete the transaction
	// ----------------------------------------------------------

	const deleteTransaction = async () => {
		const res = await fetch(
			`${backendUrl}accounts/delete-transaction/${transaction._id}`,
			{
				method: 'DELETE',
				headers: { authorization: provider.authorization },
			},
		);
		const { success, result, error, message } = await res.json();
		if (!success) {
			console.log(error, message);
		} else {
			console.log(result);
			setRenderTransactions(result.transactions);
			setShowModal(false);
		}
	};

	// --------sets the transactions Date based on unix Time---------

	const date = new Date(transaction?.date);

	// ---------------------------------------------------------------------

	return (
		<>
			{showModal ? (
				<section className='question'>
					<article>
						<p>Do you really want to delete this Transaction?</p>
						<div>
							<Button
								btnContent={'YES'}
								btnFunction={deleteTransaction}
							/>
							<Button
								btnContent={'NO'}
								btnFunction={() => setShowModal(false)}
							/>
						</div>
					</article>
				</section>
			) : null}
			<main className='transaction'>
				<div className='deleteIcon'>
					{(_delete === true &&
						provider?.account?.owner ===
							provider?.activeUser?._id) ||
					(_delete === true &&
						transaction?.owner === provider?.activeUser?._id) ? (
						<img
							src={deleteIcon}
							onClick={() => setShowModal(true)}
							alt=''
						/>
					) : null}
				</div>
				<div className='categoryInfo'>
					<img
						src={getIcon()}
						alt=''
					/>
					<div>
						<h3>{transaction?.category}</h3>
						<p>{`${date
							.toString()
							.slice(16, 21)
							.replace(':', '.')} , ${date
							.toString()
							.slice(8, 10)} ${date.toString().slice(4, 7)} ${date
							.toString()
							.slice(11, 15)}`}</p>
					</div>
				</div>
				<div>
					{transaction?.type === 'income' ? (
						<h5>{`${transaction?.amount.toLocaleString('de-DE', {
							style: 'currency',
							currency: 'EUR',
						})}`}</h5>
					) : (
						<h4>{`${transaction?.amount.toLocaleString('de-DE', {
							style: 'currency',
							currency: 'EUR',
						})}`}</h4>
					)}
				</div>
			</main>
		</>
	);
};

export default Transaction;
