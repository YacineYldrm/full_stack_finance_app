import Transaction from '../Transaction/Transaction';
import './TransactionDay.scss';
const TransactionDay = ({ date, transactions,provider }) => {
	const newdate = new Date(date);

	// #################################################

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

	// #################################################

	const filteredTransactions = transactions.filter((transaction) => {
		return (
			new Date(transaction.date - new Date().getTimezoneOffset() * 60000)
				.toISOString()
				.slice(0, 10) === date
		);
	});

	// #################################################

	return (
		<>
			<main className='transactionsDay'>
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
				<div>
					{filteredTransactions.sort(
				(transOne, transTwo) => transTwo.date - transOne.date,
			).map((transaction) => (
						<Transaction
							provider={provider}
							_delete={true}
							key={transaction._id}
							transaction={transaction}
						/>
					))}
				</div>
			</main>
		</>
	);
};

export default TransactionDay;
