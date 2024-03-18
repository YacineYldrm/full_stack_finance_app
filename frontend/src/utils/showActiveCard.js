

const getCards = () => {
    const cards = document.body.getElementsByClassName("card");

    return cards
};

const showActiveCard = (provider) => {
    const cards = getCards()
    console.log(cards[provider?.cardIndex])
    const activeCard = cards[provider?.cardIndex]
    // scrollIntoView({ left: activeCard.offsetLeft })
    console.log(activeCard)
    scrollTo(activeCard)
}


export default showActiveCard;