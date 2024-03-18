import food from '../../../public/transactionIcons/food.svg';
import shopping from '../../../public/transactionIcons/shopping.svg';
import insurance from '../../../public/transactionIcons/insurance.svg';
import otherIncome from '../../../public/transactionIcons/otherIncome.svg';
import otherExpense from '../../../public/transactionIcons/otherExpense.svg';
import rent from '../../../public/transactionIcons/rent.svg';
import salary from '../../../public/transactionIcons/salary.svg';
import deleteIcon from '../../../public/transactionIcons/deleteIcon.svg';
import activeCard from '../../../public/activeCard.svg';
import { backendUrl } from '../../api/index.js';
import './Transaction.scss';
import { useState } from 'react';
import Button from '../Button/Button.jsx';
const Transaction = ({ provider, transaction, _delete, groupDate }) => {
	const [showModal, setShowModal] = useState(false);
	// #################################################

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
		} else if(transaction?.category === "Other Icome"){
			return otherIncome;
        } else if(transaction?.category === "" && transaction?.type === "expense"){
            return otherExpense
        } else{
            return otherIncome
		}
	};

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
			provider.setAccount(result);
			setShowModal(false);
		}
	};
	// #################################################

	const date = new Date(transaction?.date);

	// #################################################

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
						provider?.account?.owner === provider?.activeUser?._id) ||
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
