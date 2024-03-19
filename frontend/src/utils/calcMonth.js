const calcMonth = (account, provider) => {
    const currentMonth = new Date().getMonth();

    const incomes = account.transactions?.filter(
        (transaction) =>
            transaction.type === "income" &&
            new Date(transaction.date).getMonth() === currentMonth
    );

    const expenses = account.transactions?.filter(
        (transaction) =>
            transaction.type === "expense" &&
            new Date(transaction.date).getMonth() === currentMonth
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
