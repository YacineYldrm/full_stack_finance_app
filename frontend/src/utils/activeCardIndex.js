const getCards = () => {
    const cards = document.body.getElementsByClassName("card");
    return cards;
};

const activeCardIndex = (provider) => {
    const cards = getCards();
    const cardArray = Array.prototype.slice.call(cards);
    const activeCard = cardArray[provider?.cardIndex];
    return cardArray?.indexOf(activeCard);
};

export default activeCardIndex;
