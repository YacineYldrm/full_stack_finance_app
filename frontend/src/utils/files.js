
// ######################Hooks#######################
import calcTotal from './calcTotal';
import getAllAccounts from './getAllAccounts';
import updateArray from './updateArray';
import getDates from './getDates';
import calcMonth from './calcMonth';
import calcExpectedExpenses from './calcExpectedExpenses';
import { silentRefresh } from './refresh';
import changeCardOnSwipe from './changeCardOnSwipe';
// ######################Components#######################
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import TransactionDay from '../components/TransactionDay/TransactionDay';
import ModalAllTransaction from '../components/ModalAllTransaction/ModalAllTransaction';
import Navbar from '../components/Navbar/Navbar';
import CardCourouselle from '../components/CardCarouselle/CardCarouselle';
import ProfileImageUpload from '../components/ProfileImageUpload/ProfileImageUpload';
import Transaction from '../components/Transaction/Transaction';
// ######################libraries#######################
import { useNavigate, Link, useParams, NavLink } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';

// ######################SVG#######################
import Arrow from '../../public/svg/Arrows/Arrow';
import logo from "../../public/Logo.svg";
import incomeIcon from '../../public/incomeIcon.svg';
import expenseIcon from '../../public/expenseIcon.svg';
import magnifire from '../../public/magnifire.svg';
import calendar from '../../public/calendar.svg';
import bigPresent from '../../public/splash/gift.png';
import greenDollar from '../../public/splash/greenDollar.png';
import bankCard from '../../public/splash/giftCard.svg';
import shadow from '../../public/splash/shadow.svg';
import blueDollar from '../../public/splash/blueDollar.png';
import coin from '../../public/splash/coin.png';
import closedEye from '../../public/eye/closedEye.svg';
import openEye from '../../public/eye/openEye.svg';
import limitIcon from '../../public/limitIcon.svg';
import expectedGreen from '../../public/expectedIcons/expectedGreen.svg';
import expectedYellow from '../../public/expectedIcons/expectedYellow.svg';
import expectedRed from '../../public/expectedIcons/expectedRed.svg';
import arrowright from "../../public/ArrowRight.svg";
import feather from "../../public/feather.svg";
import bell from "../../public/bell.svg";
import settings from "../../public/settings.svg";
import faq from "../../public/faq.svg";
import logouticon from "../../public/logout.svg";
import editPen from '../../public/edit_pen.svg';
import changeUser from '../../public/changeUser.svg';
import deleteIcon from '../../public/delete.svg';
import changePasswordIcon from '../../public/changePassword.svg';
import changeMail from '../../public/changeMail.svg';
import deleteUserIcon from '../../public/deleteUser.svg';
import left from '../../public/splash/left.svg';
import right from '../../public/splash/right.svg';
import circle from '../../public/splash/circle.svg';
import cardBg from "../../public/cardBgs/cardBg.jpeg";
import cardBg1 from "../../public/cardBgs/cardBg1.avif";
import cardBg2 from "../../public/cardBgs/cardBg2.webp";
import cardBg3 from "../../public/cardBgs/cardBg3.webp";
import cardBg4 from "../../public/cardBgs/cardBg4.webp";
import cardBg5 from "../../public/cardBgs/cardBg5.jpeg";
import cardBg6 from "../../public/cardBgs/cardBg6.avif";
import cardBg7 from "../../public/cardBgs/cardBg7.avif";
import cardBg8 from "../../public/cardBgs/cardBg8.jpeg";
import cardBg9 from "../../public/cardBgs/cardBg9.jpeg";
import activeCard from "../../public/activeCard.svg";
import chip from "../../public/chip.svg";
import placeholderImage from '../../public/PlaceHolderImage.svg';

import Search from '../../public/svg/Search/Search';
import CardIcon from "../../public/svg/cardIcon";
import HomeIcon from "../../public/svg/homeIcon";
import PlusIcon from "../../public/svg/plusIcon";
import ReportIcon from "../../public/svg/reportIcon";
import food from '../../public/transactionIcons/food.svg';
import shopping from '../../public/transactionIcons/shopping.svg';
import insurance from '../../public/transactionIcons/insurance.svg';
import otherIncome from '../../public/transactionIcons/otherIncome.svg';
import otherExpense from '../../public/transactionIcons/otherExpense.svg';
import rent from '../../public/transactionIcons/rent.svg';
import salary from '../../public/transactionIcons/salary.svg';
// ####################URLS#######################
import { backendUrl, mediaUrl } from '../api';




export {
    food,
    shopping,
    insurance,
    otherExpense,
    otherIncome,
    rent,
    salary,
    placeholderImage,
    CardIcon,
    HomeIcon,
    PlusIcon,
    ReportIcon,
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
    left,
    right,
    circle,
    ProfileImageUpload,
    changePasswordIcon,
    changeMail,
    deleteUserIcon,
    useParams,
    greenDollar,
    coin,
    blueDollar,
    editPen,
    changeUser,
    deleteIcon,
    arrowright,
    feather,
    bell,
    settings,
    faq,
    logouticon,
    calcTotal,
    Card,
    Arrow,
    Button,
    getAllAccounts,
    backendUrl,
    mediaUrl,
    useNavigate,
    useEffect,
    useState,
    updateArray,
    logo,
    incomeIcon,
    expenseIcon,
    TransactionDay,
    ModalAllTransaction,
    magnifire,
    calendar,
    Navbar,
    getDates,
    bigPresent,
    bankCard,
    shadow,
    CardCourouselle,
    limitIcon,
    calcMonth,
    calcExpectedExpenses,
    expectedGreen,
    expectedYellow,
    expectedRed,
    Link,
    silentRefresh,
    closedEye,
    openEye,
    useMemo,
    _,
    changeCardOnSwipe,
    Transaction,
    Search,
    NavLink,

}