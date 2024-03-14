import { useState, useEffect } from 'react';
import './AddIncome.scss';
import { backendUrl } from '../../api';
import Button from '../../components/Button/Button';
import Arrow from '../../../public/svg/Arrows/Arrow';
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';
import getAllAccounts from '../../utils/getAllAccounts';

const AddIncome = ({ provider }) => {
	const [transactionInfo, setTransactionInfo] = useState({});
	const [date, setDate] = useState(
		new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
			.toISOString()
			.slice(0, 10),
	);
	const [time, setTime] = useState(
		new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
			.toISOString()
			.slice(11, 16),
	);
	const [file, setFile] = useState();
	const navigate = useNavigate();

	// #################################################

	const getDateTime = () => {
		return new Date(`${date}T${time}:00`).getTime();
	};

	// #################################################

	useEffect(() => {
		if (provider.authorization) getAllAccounts(provider);
	}, [provider.authorization]);

	// #################################################

	const addTransaction = async () => {
		event.preventDefault();
		const fd = new FormData();
		const transaction = {
			...transactionInfo,
			date: getDateTime(),
			type: 'income',
			accountId: provider.account._id,
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
			provider.setAccount(result);
			navigate('/');
		}
	};

	// #################################################

	return (
		<>
			<main className='addIncome'>
				<div className='userInfo'>
					<Arrow onClick={() => navigate('/')} />
					<img
						src={`http://localhost:3001/${provider.activeUser?.profileImage}`}
						alt=''
					/>
				</div>

				<h1>Add income</h1>
				<Card account={provider.account} />
				<form>
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
						<option value='Sallary'>Sallary</option>
						<option value='Other Income'>Other Income</option>
					</select>

					<div>
						<label htmlFor='date'>
							Date
							<input
								type='date'
								name='date'
								id='date'
								defaultValue={date}
								onChange={(e) => setDate(e.target.value)}
							/>
						</label>

						<label htmlFor='time'>
							Time
							<input
								type='time'
								name='time'
								id='time'
								defaultValue={time}
								onChange={(e) => setTime(e.target.value)}
							/>
						</label>
					</div>
					<textarea
						name='comment'
						id='commen'
						placeholder='Comment...'
						cols='30'
						rows='1'
						onChange={(e) =>
							setTransactionInfo({
								...transactionInfo,
								comment: e.target.value,
							})
						}></textarea>
					<div>
						<Button
							btnContent={'Add income'}
							btnFunction={addTransaction}
						/>
						<input
							type='file'
							accept='image/*'
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</div>
				</form>
			</main>
		</>
	);
};

export default AddIncome;
