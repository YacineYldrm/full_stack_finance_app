const getCards = () => {
    const cards = document.body.getElementsByClassName("card");
    return Array.prototype.slice.call(cards);
};

const changeCardOnSwipe = () => {
    const cards = getCards();

    const activeCard = cards.find(
        (card) =>
            card.getBoundingClientRect().left > 0 &&
            card.getBoundingClientRect().right > 0
    );

    return cards?.indexOf(activeCard);
};

export default changeCardOnSwipe;
