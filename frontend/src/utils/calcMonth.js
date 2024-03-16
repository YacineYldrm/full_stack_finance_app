const calcMonth = (account, provider) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const monthStart = new Date(year, month, 0).getTime();

    const incomes = account.transactions.filter(
        (transaction) =>
            transaction.type === "income" && transaction.date > monthStart
    );

    const expenses = account.transactions.filter(
        (transaction) =>
            transaction.type === "expense" && transaction.date > monthStart
    );

    const monthlyIncomeTotal = incomes?.reduce(
        (acc, curr) => acc + curr.amount,
        0
    );

    provider.setMonthlyIncome(monthlyIncomeTotal);

    const monthlyExpenseTotal = expenses?.reduce(
        (acc, curr) => acc + curr.amount,
        0
    );

    provider.setMonthlyExpense(monthlyExpenseTotal);
};

export default calcMonth;
