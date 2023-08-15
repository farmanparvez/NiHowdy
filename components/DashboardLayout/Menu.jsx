import card from "../../assets/card.svg";
import user from "../../assets/user.svg";
import plus from "../../assets/plus.svg";
import msg1 from "../../assets/msg1.svg";
import kyc from "../../assets/kyc.svg";
import bitcoin from "../../assets/cryptobitcoin.svg";

const Menu = () => {
  const memu = [
    {
      icon: card,
      name: "Savings Card",
      link: "/saved-card",
      id: "/saved-card",
    },
    {
      icon: user,
      name: "My Account",
      link: "/account",
      id: "/account",
    },
    // {
    //   icon: plus,
    //   name: "My Prescriptions",
    //   link: "/prescriptions",
    //   id: "/prescriptions",
    // },
    {
      icon: plus,
      name: "Prescription History",
      link: "/prescriptions-history",
      id: "/prescriptions-history"
    },
    {
      icon: bitcoin,
      name: "Bitcoin Rewards",
      link: "/bitcoin-reward",
      id: "/bitcoin-reward",
    },
    {
      icon: msg1,
      name: "Mail Order",
      link: "/mail-order",
      id: "/mail-order",
    },
    {
      icon: kyc,
      name: "KYC",
      link: "/kyc",
      id: "/kyc",
    },
    // {
    //   icon: msg2,
    //   name: "Messages",
    //   link: "/messages",
    //   id: "/messages",
    // },
  ];
  return memu;
};

export default Menu;
