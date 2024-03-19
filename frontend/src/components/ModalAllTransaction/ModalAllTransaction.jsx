// -------------------------Imports---------------------------
import './ModalAllTransaction.scss';

import {
	Arrow,
	mediaUrl,
	useEffect,
	useState,
	calendar,
	Transaction,
	Search,
} from '../../utils/files';
// -------------------------Imports---------------------------

const ModalAllTransaction = ({ transactions, modal, setModal, provider }) => {
	// -------------------------States---------------------------

	const [search, setSearch] = useState('');
	const [date, setDate] = useState('');
	const [result, setResult] = useState(transactions);
	// -------------------------States---------------------------

	// ------------Triggers on Date and Search Input changes-----
	//          Filters and renders the asearch results
	// ----------------------------------------------------------
	useEffect(() => {
		const filterResult = transactions?.filter((transaction) => {
			if (search !== '' && date !== '') {
				return (
					(transaction?.category
						.toLowerCase()
						.includes(search.toLowerCase()) &&
						new Date(
							transaction?.date -
								new Date().getTimezoneOffset() * 60000,
						)
							.toISOString()
							.slice(0, 10) === date) ||
					(transaction?.amount.toString() === search &&
						new Date(
							transaction?.date -
								new Date().getTimezoneOffset() * 60000,
						)
							.toISOString()
							.slice(0, 10) === date) ||
					(transaction?.type
						.toLowerCase()
						.includes(search.toLowerCase()) &&
						new Date(
							transaction?.date -
								new Date().getTimezoneOffset() * 60000,
						)
							.toISOString()
							.slice(0, 10) === date)
				);
			} else if (search !== '' && date === '') {
				return (
					transaction?.category
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					transaction?.amount.toString() === search ||
					transaction?.type
						.toLowerCase()
						.includes(search.toLowerCase())
				);
			} else if (search == '' && date !== '') {
				return (
					new Date(
						transaction?.date -
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

	// ---------------------------------------------------------------------

	return (
		<>
			<section className='alltransactionmodal'>
				<article>
					<Arrow onClick={() => setModal(false)} />
					<img
						src={`${mediaUrl}${provider.activeUser?.profileImage}`}
						alt=''
					/>
				</article>
				<article>
					<label>
						<input
							type='text'
							onChange={(e) => setSearch(e.target.value)}
						/>
						<Search />
					</label>

					<label>
						<input
							type='date'
							name=''
							id=''
							defaultValue={null}
							onChange={(e) => setDate(e.target.value)}
						/>
						<img
							src={calendar}
							alt=''
						/>
					</label>
				</article>
				<article>
					<div>
						{result?.map((transaction, index) => (
							<Transaction
								key={index}
								transaction={transaction}
							/>
						))}
					</div>
				</article>
			</section>
		</>
	);
};

export default ModalAllTransaction;
