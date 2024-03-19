const updateArray = (provider) => {
    const accounts = [...provider?.accounts];
    const newArray = accounts.splice(provider?.activeCard, 1);

    const newAccountsArray = [...newArray, ...accounts];


    provider?.setAccount(newArray[0]);
    provider?.setAccounts(newAccountsArray);
    provider?.setCardIndex(0);
};

export default updateArray;
