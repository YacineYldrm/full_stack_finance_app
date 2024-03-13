import Transaction from "../Transaction/Transaction"

const TransactionDay = ({date,transactions}) => {
    const newdate = new Date(date)
    const getDay = ()=>{
        
        if(newdate.toString().slice(0,3)==="Mon"){
            return "Monday"
        } else if(newdate.toString().slice(0,3)==="Tue"){
            return "Tuesday"
        } else if(newdate.toString().slice(0,3)==="Wed"){
            return "Wednesday"
        } else if(newdate.toString().slice(0,3)==="Thu"){
            return "Thursday"
        } else if(newdate.toString().slice(0,3)==="Fri"){
            return "Friday"
        } else if(newdate.toString().slice(0,3)==="Sat"){
            return "Saturday"
        } else if(newdate.toString().slice(0,3)==="Sun"){
            return "Sunday"
        }
    }
    const filteredTransactions = transactions.filter((transaction)=>{
        return new Date(transaction.date - (new Date().getTimezoneOffset()*60000)).toISOString().slice(0,10)===date
    })
    return ( 
        <>
        <section>
            <div>
                <p>{getDay()}</p>
                <p>{newdate.toISOString().replace(/T.*/,'').split('-').reverse().join('-')}</p>
            </div>
            <div>
                {filteredTransactions.map((transaction)=><Transaction key={transaction._id} transaction={transaction}/>)}
            </div>
        </section>
        </>
     );
}
 
export default TransactionDay;