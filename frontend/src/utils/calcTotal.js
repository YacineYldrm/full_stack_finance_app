



const calcTotal = (account, provider) => {

    const incomes = account.transactions.filter(
        (transaction) => transaction.type === 'income',
    );
    const expenses = account.transactions.filter(
        (transaction) => transaction.type === 'expense',
    );
    provider.setIncomeTotal(incomes?.reduce((acc, curr) => acc + curr.amount, 0));
    provider.setExpenseTotal(expenses?.reduce((acc, curr) => acc + curr.amount, 0));

};



export default calcTotal;