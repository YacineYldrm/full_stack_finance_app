import logo from '../../../public/logo.png'
import incomeIconBg from "../../../public/incomeIconBg.svg";
import trendingUp from "../../../public/trendingUp.svg";
import expenseIconBg from "../../../public/expenseIconBg.svg";
import trendingDown from "../../../public/trendingDown.svg";
import { useEffect, useState } from 'react';
import TransactionDay from '../../components/TransactionDay/TransactionDay';
import { backendUrl } from '../../api';
import ModalAllTransaction from '../../components/ModalAllTransaction/ModalAllTransaction';

const AllTransaction = ({provider}) => {
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [allDates, setAllDates] = useState([])
    const [dates,setDates] = useState([])
    const [modal,setModal] = useState(false)
    
    
    const getAllAccounts = async () => {
        const response = await fetch(`${backendUrl}accounts`, {
            method: "GET",
            headers: { authorization: provider.authorization },
        });
        const { success, result, error, message } = await response.json();
        if (!success) {
            console.log(error, message);
        } else {
            console.log(result);
            provider.setAccounts(result);
            provider.setAccount(result[0]);
            
        }
    };
    useEffect(() => {
        getAllAccounts();
    }, [provider.authorization]);

    

    const getDates = ()=>{
        let updatedDates = []
        provider.account?.transactions?.forEach((transaction)=>{
            const newdate = new Date(transaction.date - (new Date().getTimezoneOffset()*60000)).toISOString().slice(0, 10)
            updatedDates = [...updatedDates,newdate]
            
            
        })
        setAllDates(updatedDates)
    }

    useEffect(()=>{
        setDates([...new Set(allDates)])
    },[allDates])

    
    useEffect(() => {
        getDates()
        const incomes = provider.account?.transactions?.filter(
            (transaction) => transaction.type === "income"
        );
        const expenses = provider.account?.transactions?.filter(
            (transaction) => transaction.type === "expense"
        );
        setIncomeTotal(incomes?.reduce((acc, curr) => acc + curr.amount, 0));
        setExpenseTotal(expenses?.reduce((acc, curr) => acc + curr.amount, 0));
    }, [provider.account]);

    return ( 
    <>
    {modal? <ModalAllTransaction transactions={provider.account.transactions} modal={modal} setModal={setModal}/>:null}
    <header>
        <img src={logo} alt="finco logo" />
        <img src={`http://localhost:3001/${provider.activeUser.profileImage}`} alt="profile Image" />
    </header>
    <main>
        <div>
            <h1>All transaction</h1>
            <div>
                <img src="" alt="search" onClick={()=>setModal(!modal)}/>
                <img src="" alt="calendar" />
            </div>
        </div>
        <div>
        <article>
            <div>
                <img src={incomeIconBg} alt="income icon" />
                <img src={trendingUp} alt="income icon" />
            </div>
            <p>Income</p>
            <h2>+${incomeTotal}</h2>
        </article>
        <article>
                            <div>
                                <img src={expenseIconBg} alt="expense icon" />
                                <img src={trendingDown} alt="expense icon" />
                            </div>
                            <p>Expense</p>
                            <h2>-${expenseTotal}</h2>
                        </article>
        </div>
        <section>
            {dates?.sort().reverse().map((date,i)=><TransactionDay date={date} key={i} transactions={provider.account.transactions}/>)}
        </section>
    </main>
    </> );
}
 
export default AllTransaction;