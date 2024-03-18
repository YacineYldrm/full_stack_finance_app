import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import changeCardOnSwipe from "../../utils/changeCardOnSwipe";
import Card from "../Card/Card";
import showActiveCard from "../../utils/showActiveCard";
import activeCardIndex from "../../utils/activeCardIndex";

const CardCourouselle = ({ provider }) => {
    const [index, setIndex] = useState(null);

    // const [foundCard, setFoundCard] = useState(null);

    // useEffect(() => {
    //     const index = activeCardIndex(provider);
    //     setFoundCard(index);
    // }, [provider]);

    // useEffect(() => {
    //     console.log("foundCard", foundCard);
    //     console.log("activeCardIndex", activeCardIndex(provider));
    //     provider?.setCardIndex(activeCardIndex(provider));
    //     setIndex(activeCardIndex(provider));
    // }, [foundCard]);

    // useEffect(() => {
    //     console.log("indexState", index);
    //     showActiveCard(provider);
    // }, [index]);

    const handleScroll = (e) => {
        handleEndScroll();
    };

    const handleEndScroll = useMemo(
        () =>
            _.debounce(() => {
                changeCardOnSwipe(provider);
            }, 100),
        [provider]
    );

    return (
        <article
            // onScroll={() => changeCardOnSwipe(provider)}
            onScroll={(e) => handleScroll(e)}
            className="cards_carouselle_wrapper"
            id="carouselle"
        >
            {provider?.accounts?.map((account) => {
                return (
                    <Card
                        key={account._id}
                        cardId={account._id}
                        provider={provider}
                        account={account}
                    />
                );
            })}
        </article>
    );
};

export default CardCourouselle;
