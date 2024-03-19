import "./Card.scss";
import cardBg from "../../../public/cardBgs/cardBg.jpeg";
import cardBg1 from "../../../public/cardBgs/cardBg1.avif";
import cardBg2 from "../../../public/cardBgs/cardBg2.webp";
import cardBg3 from "../../../public/cardBgs/cardBg3.webp";
import cardBg4 from "../../../public/cardBgs/cardBg4.webp";
import cardBg5 from "../../../public/cardBgs/cardBg5.jpeg";
import cardBg6 from "../../../public/cardBgs/cardBg6.avif";
import cardBg7 from "../../../public/cardBgs/cardBg7.avif";
import cardBg8 from "../../../public/cardBgs/cardBg8.jpeg";
import cardBg9 from "../../../public/cardBgs/cardBg9.jpeg";
import activeCard from "../../../public/activeCard.svg";
import chip from "../../../public/chip.svg";
import { useEffect, useState } from "react";
import { backendUrl, mediaUrl } from "../../api";

const Card = ({ cardId, provider, account }) => {
    const colors = [
        "#005eb060",
        "#b0000060",
        "#b0610060",
        "#20b00060",
        "#00b0a160",
        "#4f00b060",
        "#a100b060",
        "#b0005860",
        "#bb00ff60",
        "#a1a1a19b",
    ];

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

    const [allMembers, setAllMembers] = useState([]);

    // ############### GET ALL MEMBERS #################

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
                    return account?.members.some((member) => {
                        return member.toString() === users._id.toString();
                    });
                })
            );
        }
    };

    useEffect(() => {
        getAllMembers();
    }, [account?.members]);

    // #####################################################

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
                    {/* <h4>{account?.expirationDate.replace("-","/")}</h4> */}
                </article>
            </section>
        </section>
    );
};

export default Card;
