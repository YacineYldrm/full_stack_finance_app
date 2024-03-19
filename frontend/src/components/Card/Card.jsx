// -------------------------Imports---------------------------

import "./Card.scss";

import {
    backendUrl,
    mediaUrl,
    useEffect,
    useState,
    cardBg,
    cardBg1,
    cardBg2,
    cardBg3,
    cardBg4,
    cardBg5,
    cardBg6,
    cardBg7,
    cardBg8,
    cardBg9,
    activeCard,
    chip,
} from "../../utils/files";

// -------------------------Imports---------------------------

const Card = ({ cardId, provider, account }) => {
    // -------------------------States---------------------------

    const [allMembers, setAllMembers] = useState([]);

    // ---------Cards array to pick for each card depending on the index calculation beásed on the last four numbers----------

    const cardBgs = [
        cardBg,
        cardBg1,
        cardBg2,
        cardBg3,
        cardBg4,
        cardBg5,
        cardBg6,
        cardBg7,
        cardBg8,
        cardBg9,
    ];

    const cardColorNum = Number(account?.cardNumber?.slice(-4));
    const cardColorIndex = Number((cardColorNum * 128).toString().split("")[3]);

    // ----------Renders on account members change----------------
    // to Update the members profile pictures on the top left side of the card
    // ----------------------------------------------------------

    const getAllMembers = async () => {
        const response = await fetch(`${backendUrl}users`, {
            method: "GET",
            headers: { authorization: provider?.authorization },
        });
        const { success, result, error, message } = await response.json();
        if (!success) console.log(error, message);
        else {
            setAllMembers(
                result.filter((users) => {
                    return account?.members?.some((member) => {
                        return member.toString() === users._id.toString();
                    });
                })
            );
        }
    };

    useEffect(() => {
        getAllMembers();
    }, [account?.members]);

    // ---------------------------------------------------------------------

    return (
        <section className="card" id={cardId}>
            <img className="pattern" src={cardBgs[cardColorIndex]} alt="" />
            <section>
                <article>
                    <div className="member_wrapper">
                        {allMembers.map((member, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{ left: -`${index * 10}` }}
                                >
                                    <img
                                        src={`${mediaUrl}${member.profileImage}`}
                                        alt="profile picture."
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <img src={activeCard} alt="" />
                </article>
                <article>
                    <h4>{account?.type}</h4>
                    <h4>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>{" "}
                        {account?.cardNumber?.toString().slice(-4)}
                    </h4>
                </article>
                <article>
                    <img src={chip} alt="" />
                    <h4>{account?.expirationDate}</h4>
                </article>
            </section>
        </section>
    );
};

export default Card;
