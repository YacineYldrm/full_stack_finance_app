import changeCardOnSwipe from "./changeCardOnSwipe";

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
    // console.log(activeCard.getBoundingClientRect());
    const activeCardPosition = activeCard?.getBoundingClientRect();

    if (activeCardPosition?.left > 0 && activeCardPosition?.right > 0) {
        console.log("changing card index");
        provider?.setCardIndex(changeCardOnSwipe());
        return;
    } else {
        setTimeout(() => {
            console.log("active card not in view");
            carouselle?.scrollTo(activeCardPosition?.x, activeCardPosition?.y);
        }, 1000);
    }
};

export default showActiveCard;
