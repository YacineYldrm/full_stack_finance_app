import { useEffect, useState } from 'react';
import Transaction from '../Transaction/Transaction';

const ModalAllTransaction = ({ transactions, modal, setModal }) => {
	const [search, setSearch] = useState('');
	const [date, setDate] = useState('');
	const [result, setResult] = useState(transactions);

	// #################################################

	useEffect(() => {
		const filterResult = transactions?.filter((transaction) => {
			if (search !== '' && date !== '') {
				return (
					JSON.stringify(transaction)
						.toLowerCase()
						.includes(search.toLowerCase()) &&
					new Date(
						transaction.date -
							new Date().getTimezoneOffset() * 60000,
					)
						.toISOString()
						.slice(0, 10) === date
				);
			} else if (search !== '' && date === '') {
				return JSON.stringify(transaction)
					.toLowerCase()
					.includes(search.toLowerCase());
			} else if (search == '' && date !== '') {
				return (
					new Date(
						transaction.date -
							new Date().getTimezoneOffset() * 60000,
					)
						.toISOString()
						.slice(0, 10) === date
				);
			} else {
				return transaction;
			}
		});

		setResult(filterResult);
	}, [search, date]);

	// #################################################

	return (
		<>
			<section>
				<div>
					<button onClick={() => setModal(!modal)}>close</button>
					{/* header von addTransaction */}
				</div>
				<div>
					<input
						type='search'
						onChange={(e) => setSearch(e.target.value)}
					/>
					<input
						type='date'
						name=''
						id=''
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>
				<div>
					<p>{search}</p>
					<div>
						{result?.map((transaction) => (
							<Transaction transaction={transaction} />
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default ModalAllTransaction;
