

const updateArray = (provider) => {
    const slicedCardsArrayStartToActive = provider?.accounts?.slice(
        provider?.activeCard,
    );
    const slicedCardsArrayActiveToEnd = provider?.accounts?.slice(
        0,
        provider?.activeCard,
    );
    const newAccountsArray = [
        ...slicedCardsArrayStartToActive,
        ...slicedCardsArrayActiveToEnd,
    ];
    provider?.setAccounts(newAccountsArray);
    provider?.setCardIndex(0);
};


export default updateArray;