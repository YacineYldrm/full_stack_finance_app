import { useEffect, useState } from 'react';
import Transaction from '../Transaction/Transaction';
import './ModalAllTransaction.scss'
import Arrow from '../../../public/svg/Arrows/Arrow';
import Search from '../../../public/svg/Search/Search';

const ModalAllTransaction = ({ transactions, modal, setModal, provider }) => {
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
			<section className='alltransactionmodal'>
				<article >
					<Arrow onClick={()=>setModal(false)}/>
					<img src={`http://localhost:3001/${provider.activeUser.profileImage}`} alt="" />
				</article>
				<article>
					<div>
						
					<input
						type='search'
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Search/>
					</div>
					<input
						type='date'
						name=''
						id=''
						onChange={(e) => setDate(e.target.value)}
					/>
				</article>
				<article>
					<p>{search}</p>
					<div>
						{result?.map((transaction) => (
							<Transaction transaction={transaction} />
						))}
					</div>
				</article>
			</section>
		</>
	);
};

export default ModalAllTransaction;
