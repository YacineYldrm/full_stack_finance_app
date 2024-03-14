import './Reports.scss';
import logo from '../../../public/Logo.svg';
import incomeIcon from '../../../public/incomeIcon.svg';
import expenseIcon from '../../../public/expenseIcon.svg';
import { useEffect, useState } from 'react';
import Transaction from '../../components/Transaction/Transaction';
import Navbar from '../../components/Navbar/Navbar';

const Reports = ({ provider }) => {
	const [expenseTotal, setExpenseTotal] = useState(0);
	const [incomeTotal, setIncomeTotal] = useState(0);

	const [allTransactions, setAllTransactions] = useState([]);

	const [renderedTransactions, setRenderedTransactions] = useState([]);
	const [index, setIndex] = useState(5);

	// #######################render loadmore #############################

	useEffect(() => {
		setRenderedTransactions(allTransactions?.slice(0, index));
	}, [index, allTransactions]);

	// #########################Total calc################################

	useEffect(() => {
		const incomes = renderedTransactions?.filter(
			(transaction) => transaction.type === 'income',
		);
		const expenses = renderedTransactions?.filter(
			(transaction) => transaction.type === 'expense',
		);
		setIncomeTotal(incomes?.reduce((acc, curr) => acc + curr.amount, 0));
		setExpenseTotal(expenses?.reduce((acc, curr) => acc + curr.amount, 0));
	}, [renderedTransactions]);

	// ###############################################################

	useEffect(() => {
		setAllTransactions(
			provider?.account?.transactions?.sort(
				(transOne, transTwo) => transTwo.date - transOne.date,
			),
		);
	}, [provider.account]);

	// ###############################################################

	return (
		<>
			<main className='report_main'>
				<section>
					<div className='userInfo'>
						<img
							src={logo}
							alt='finco logo'
						/>
						<img
							src={`http://localhost:3001/${provider.activeUser?.profileImage}`}
							alt=''
						/>
					</div>
					<h1>Report</h1>
					<div>
						<article>
							<div>
								<img
									src={incomeIcon}
									alt='income icon'
								/>
							</div>
							<div>
								<p>Income</p>
								<h2>
									{incomeTotal?.toLocaleString('de-DE', {
										style: 'currency',
										currency: 'EUR',
									})}
								</h2>
							</div>
						</article>
						<article>
							<div>
								<img
									src={expenseIcon}
									alt='expense icon'
								/>
							</div>
							<div>
								<p>Expense</p>
								<h2>
									{expenseTotal?.toLocaleString('de-DE', {
										style: 'currency',
										currency: 'EUR',
									})}
								</h2>
							</div>
						</article>
					</div>
				</section>
				<section>
					{renderedTransactions?.map((transaction) => (
						<Transaction
							key={transaction._id}
							transaction={transaction}
						/>
					))}
					<p
						onClick={() => {
							index < allTransactions?.length
								? setIndex(index + 5)
								: null;
						}}>
						load more
					</p>
					<p
						onClick={() => {
							index !== 5 ? setIndex(index - 5) : null;
						}}>
						show less
					</p>
				</section>
			</main>
			<Navbar />
		</>
	);
};

export default Reports;
