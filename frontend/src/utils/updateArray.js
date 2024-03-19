const updateArray = (provider) => {
    const accounts = [...provider?.accounts];
    const newArray = accounts.splice(provider?.activeCard, 1);
    console.log(newArray);
    console.log(accounts);
    const newAccountsArray = [...newArray, ...accounts];
    console.log(newAccountsArray);

    provider?.setAccount(newArray[0]);
    provider?.setAccounts(newAccountsArray);
    provider?.setCardIndex(0);
};

export default updateArray;
