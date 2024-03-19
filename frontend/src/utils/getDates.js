// -----------------called from useEffect  @ allTransactions---------------
//                  Sets transactions to Groups by Day
// ------------------------------------------------------------------------



const getDates = (provider, setAllDates) => {
    let updatedDates = [];
    provider.account?.transactions?.forEach((transaction) => {
        const newdate = new Date(
            transaction.date - new Date().getTimezoneOffset() * 60000,
        )
            .toISOString()
            .slice(0, 10);
        updatedDates = [...updatedDates, newdate];
    });
    setAllDates(updatedDates);
};


export default getDates;