const getCards = () => {
    const cards = document.body.getElementsByClassName("card");

    return cards;
};

const changeCardOnSwipe = () => {
    const cards = getCards();

    const cardsArray = Array.prototype.slice.call(cards);
    const activeCard = cardsArray.find(
        (card) =>
            card.getBoundingClientRect().left > 0 &&
            card.getBoundingClientRect().right > 0
    );

    return cardsArray?.indexOf(activeCard);
};

export default changeCardOnSwipe;
