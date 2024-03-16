const calcExpectedExpenses = (monthlyExpenseTotal) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const monthLength = new Date(year, month + 1, 0).getDate();

    const today = new Date(Date.now()).getDate();

    const expectedExpenses = (monthlyExpenseTotal / today) * monthLength;

    return expectedExpenses;
};

export default calcExpectedExpenses;
