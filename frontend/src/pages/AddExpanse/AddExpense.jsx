import { useState } from 'react';

import { backendUrl } from '../../api';
import Button from '../../components/Button/Button';

const AddExpense = ({ provider }) => {
	const [transactionInfo, setTransactionInfo] = useState({});
	const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
	const [time, setTime] = useState(new Date().toISOString().slice(11, 16));
	const [file, setFile] = useState();

	const getDateTime = () => {
		return new Date(`${date}T${time}:00`).getTime();
	};

	const addTransaction = async () => {
		event.preventDefault();
		const fd = new FormData();
		const transaction = {
			...transactionInfo,
			date: getDateTime(),
			type: 'expense',
			accountId: '65f0a06b73cf05b42ed0d23e',
		};
		fd.append('transactionInfo', JSON.stringify(transaction));
		file ? fd.append('image', file) : null;
		const res = await fetch(`${backendUrl}accounts/add-transaction`, {
			method: 'POST',
			body: fd,
			headers: { authorization: provider.authorization },
		});
		const { success, result, error, message } = await res.json();
		if (!success) {
			console.log(error);
			console.log(message);
		} else {
			console.log(result);
		}
	};

	return (
		<>
			<main>
				<div>
					<h1>Add income</h1>
					{/* Card component */}
				</div>
				<form>
					<div>
						<input
							type='number'
							placeholder='Amount'
							onChange={(e) =>
								setTransactionInfo({
									...transactionInfo,
									amount: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<label htmlFor='category'>Category</label>
						<select
							name='category'
							defaultValue={'Select Category...'}
							required
							id='category'
							onChange={(e) =>
								setTransactionInfo({
									...transactionInfo,
									category: e.target.value,
								})
							}>
							<option disabled>Select Category...</option>
							<option value='Food & Drink'>Food & Drink</option>
							<option value='Shopping'>Shopping</option>
							<option value='Insurance bill'>
								Insurance bill
							</option>
							<option value='Other Expense'>Other Expense</option>
						</select>
					</div>
					<div>
						<div>
							<label htmlFor='date'>Date</label>
							<input
								type='date'
								name='date'
								id='date'
								defaultValue={date}
								onChange={(e) => setDate(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor='time'>Time</label>
							<input
								type='time'
								name='time'
								id='time'
								defaultValue={time}
								onChange={(e) => setTime(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<input
							type='file'
							accept='image/*'
							onChange={(e) => setFile(e.target.files[0])}
						/>
						<textarea
							name='comment'
							id='commen'
							placeholder='Comment...'
							cols='30'
							rows='10'
							onChange={(e) =>
								setTransactionInfo({
									...transactionInfo,
									comment: e.target.value,
								})
							}></textarea>
					</div>
					<Button
						btnContent={'Add expenses'}
						btnFunction={addTransaction}
					/>
				</form>
			</main>
		</>
	);
};

export default AddExpense;
