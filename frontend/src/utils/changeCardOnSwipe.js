import showActiveCard from "./showActiveCard";

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
    const activeCardIndex = cards?.indexOf(activeCard);

    return activeCardIndex;
};

export default changeCardOnSwipe;
