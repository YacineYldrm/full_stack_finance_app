import "./Card.scss";
import cardBg from "../../../public/cardBg.jpeg";
import activeCard from "../../../public/activeCard.svg";
import chip from "../../../public/chip.svg";

const Card = ({ account }) => {
    return (
        <section className="card">
            <img className="pattern" src={cardBg} alt="" />
            <section>
                <article>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                    <img src={activeCard} alt="" />
                </article>
                <article>
                    <h4>{account?.type}</h4>
                    <h4>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span> {account.cardNumber?.toString().slice(-4)}
                    </h4>
                </article>
                <article>
                    <img src={chip} alt="" />
                    <h4>09/25</h4>
                </article>
            </section>
        </section>
    );
};

export default Card;
