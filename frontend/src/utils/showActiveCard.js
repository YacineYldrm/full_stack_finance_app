const getCards = () => {
    const cards = document.body.getElementsByClassName("card");
    return cards;
};

const showActiveCard = (provider) => {
    const carouselle = document.getElementById("carouselle");
    // console.log(carouselle);
    const cards = getCards();
    // console.log(cards);
    const activeCard = cards[provider?.cardIndex];
    // console.log(activeCard);
    console.log(activeCard?.getBoundingClientRect());
    const activeCardPosition = activeCard?.getBoundingClientRect();

    // if (activeCardPosition?.left < 0 && activeCardPosition?.right < 0) {
    //     console.log("active card not in view");
    //     carouselle?.scrollTo(activeCardPosition?.x, activeCardPosition?.y);
    //     return;
    // } else {
    //     console.log("changing card index");
    //     provider?.setCardIndex(changeCardOnSwipe());
    // }
};

export default showActiveCard;
