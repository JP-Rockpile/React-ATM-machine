const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
    </label>
  );
};

const Account = () => {
  // let deposit = 0; // state of this transaction
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [isHistory, setIsHistory] = React.useState(false);
  const [transaction, setTransaction] = React.useState([]);
  const [transactionType, setTransactionType] = React.useState('');
  
  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false);
    }
    if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
    const newTransaction = [...transaction, {transactionDate:new Date().toLocaleString(), transactionTypes:transactionType, amount:deposit}];
    setTransaction(newTransaction);
  };

  const historyToggler = (event) => {
    console.log(event.target.value);
    if (event.target.value === 'History' && !isHistory){
      setIsHistory(true);
    } else {
      setIsHistory(false);
    }
  };

  const handleModeSelect = (event) => {
    console.log(event.target.value);
    setAtmMode(event.target.value);
    setTransactionType(event.target.value);
    setValidTransaction(false);
    if (event.target.value === 'Deposit') {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <>
      <div className='ATMWindow'>
        <h2 id="total">{status}</h2>
        <div className='primary-buttons'>
          <button onClick={(e) => handleModeSelect(e)} id="deposit-selection" value='Deposit' className='primary-button'>Deposit</button>
          <button onClick={(e) => handleModeSelect(e)} id="cashback-selection"value='Cash Back' className='primary-button'>Withdraw</button>
        </div>
        <div className='secondary-buttons'>
          <button onClick={(e) => handleModeSelect(e)} id="no-selection" value='' className='secondary-button'>Clear</button>
          <button onClick={(e) => historyToggler(e)} id="history-button" value='History' className='secondary-button'>View Transaction History</button>
        </div>
        {atmMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
          ></ATMDeposit>
        )}
        {isHistory && (
          <div id='transaction-history'>
            <h1>Your Transaction History</h1>
            <hr></hr>
            {transaction.map((transaction, index) =>
              {return <p key={index.toString()}>{transaction.transactionDate} {transaction.transactionTypes} {transaction.amount}<hr></hr></p>;}
            )}
          </div>
          
        )}
      </div>
      </>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
