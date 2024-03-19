import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import changeCardOnSwipe from "../../utils/changeCardOnSwipe";
import Card from "../Card/Card";

const CardCourouselle = ({ provider }) => {
    const [index, setIndex] = useState(null);

    useEffect(() => {
        const slicedCardsArrayStartToActive = provider?.accounts?.slice(
            provider?.activeCard
        );
        const slicedCardsArrayActiveToEnd = provider?.accounts?.slice(
            0,
            provider?.activeCard
        );
        const newAccountsArray = [
            ...slicedCardsArrayStartToActive,
            ...slicedCardsArrayActiveToEnd,
        ];
        provider?.setAccounts(newAccountsArray);
        provider?.setCardIndex(0);
    }, []);

    const handleScroll = (e) => {
        handleEndScroll();
    };

    const handleEndScroll = useMemo(
        () =>
            _.debounce(() => {
                provider?.setActiveCard(changeCardOnSwipe(provider));
                provider?.setCardIndex(changeCardOnSwipe(provider));
            }, 500),
        [provider]
    );

    return (
        <article
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
