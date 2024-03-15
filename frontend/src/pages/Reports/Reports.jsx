import './Reports.scss';
import logo from '../../../public/Logo.svg';
import incomeIcon from '../../../public/incomeIcon.svg';
import expenseIcon from '../../../public/expenseIcon.svg';
import { useEffect, useState } from 'react';
import Transaction from '../../components/Transaction/Transaction';
import Navbar from '../../components/Navbar/Navbar';
import ReactECharts from 'echarts-for-react';
// import BarChart from "../../components/Charts/BarChart";

const Reports = ({ provider }) => {
	const [expenseTotal, setExpenseTotal] = useState(0);
	const [incomeTotal, setIncomeTotal] = useState(0);
	console.log(provider.account);

	const [allTransactions, setAllTransactions] = useState([]);

	const [renderedTransactions, setRenderedTransactions] = useState([]);
	const [index, setIndex] = useState(5);

	// ####################################################################
	useEffect(() => {
		provider.setAccount(provider.accounts[provider.cardIndex]);
	}, [provider]);

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

	const option1 = {
		legend: [{ show: true, itemGap: 30 }],
		tooltip: {},
		animationEasing: 'circularIn',
		color: ['#409474', '#da6e53'],
		textStyle: {
			fontFamily: 'urbanist',
			fontSize: '16px',
		},
		grid: {
			left: 10,
			containLabel: true,
			bottom: 10,
			top: 50,
			right: 10,
		},
		dataset: {
			dimensions: ['period', 'income', 'expense'],
			source: [
				{ period: 'Jan', income: 0, expense: 0 },
				{ period: 'Feb', income: 0, expense: 0 },
				{ period: 'Mar', income: 0, expense: 0 },
				{ period: 'Apr', income: 0, expense: 0 },
				{ period: 'May', income: 0, expense: 0 },
				{ period: 'Jun', income: 0, expense: 0 },
				{ period: 'Jul', income: 0, expense: 0 },
				{ period: 'Aug', income: 0, expense: 0 },
				{ period: 'Sep', income: 0, expense: 0 },
				{ period: 'Oct', income: 0, expense: 0 },
				{ period: 'Nov', income: 0, expense: 0 },
				{ period: 'Dec', income: 0, expense: 0 },
			],
		},
		xAxis: { type: 'category' },
		yAxis: { axisLabel: false, splitNumber: 6 },
		// Declare several bar series, each will be mapped
		// to a column of dataset.source by default.
		series: [{ type: 'bar' }, { type: 'bar' }],
	};
	const option2 = {
		legend: [{ show: true, itemGap: 30 }],
		tooltip: {},
		animationEasing: 'circularIn',
		color: ['#409474', '#da6e53'],
		textStyle: {
			fontFamily: 'urbanist',
			fontSize: '16px',
		},
		grid: {
			left: 10,
			containLabel: true,
			bottom: 10,
			top: 50,
			right: 10,
		},
		dataset: {
			dimensions: ['period', 'income', 'expense'],
			source: [],
		},
		xAxis: { type: 'category' },
		yAxis: { axisLabel: false, splitNumber: 6 },
		// Declare several bar series, each will be mapped
		// to a column of dataset.source by default.
		series: [{ type: 'bar' }, { type: 'bar' }],
	};

	// ###############################################################

	const setOption1 = () => {
		const source = [...option1.dataset.source];
		const transactions = provider?.account?.transactions;

		transactions?.forEach((transaction) => {
			const transactionDate = new Date(transaction.date).getMonth();
			source[transactionDate][transaction.type] =
				source[transactionDate][transaction.type] + transaction.amount;
		});
	};

	const setOption2 = () => {
		const transactions = provider?.account?.transactions;

		transactions?.forEach((transaction) => {
			const transactionYear = new Date(transaction.date).getFullYear();
			const transactionMonth = new Date(Date.now()).getMonth();
			const monthLength = new Date(
				transactionYear,
				transactionMonth + 1,
				0,
			).getDate();
			let sourceArray = [];
			for (let i = 1; i <= monthLength; i++) {
				sourceArray = [
					...sourceArray,
					{ period: i, income: 0, expense: 0 },
				];
			}
			transactions?.forEach((transaction) => {
				const transactionDay = new Date(transaction.date).getDay();
				sourceArray[transactionDay][transaction.type] =
					sourceArray[transactionDay][transaction.type] +
					transaction.amount;
			});
			// source[transactionDate][transaction.type] =
			option2.dataset.source = sourceArray;
			console.log(sourceArray);
			// 	source[transactionDate][transaction.type] + transaction.amount;
		});
	};

	setOption1();
	setOption2();

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
					<article className='bar_chart'>
						<ReactECharts option={option1} />
					</article>
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
