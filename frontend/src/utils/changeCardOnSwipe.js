import showActiveCard from "./showActiveCard";

const getCards = () => {
    const cards = document.body.getElementsByClassName("card");
    return Array.prototype.slice.call(cards);
};

const changeCardOnSwipe = (provider) => {
    const cards = getCards();

    const activeCard = cards.find(
        (card) =>
            card.getBoundingClientRect().left > 0 &&
            card.getBoundingClientRect().right > 0
    );
    const activeCardIndex = cards?.indexOf(activeCard);

    const slicedCardsArrayStartToActive =
        provider?.accounts?.slice(activeCardIndex);

    const slicedCardsArrayActiveToEnd = provider?.accounts?.slice(
        0,
        activeCardIndex
    );

    const newAccountsArray = [
        ...slicedCardsArrayStartToActive,
        ...slicedCardsArrayActiveToEnd,
    ];
    provider?.setAccounts(newAccountsArray);
};

export default changeCardOnSwipe;
