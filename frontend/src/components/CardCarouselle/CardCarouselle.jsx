import { useEffect } from 'react';
import changeCardOnSwipe from '../../utils/changeCardOnSwipe';
import Card from '../Card/Card';
import showActiveCard from '../../utils/showActiveCard';


const CardCourouselle = ({ provider }) => {
    return (
        <article
            onScroll={() => provider?.setCardIndex(changeCardOnSwipe())}

            className='cards_carouselle_wrapper'>
            {provider.accounts.map((account) => {
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
