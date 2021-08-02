/*jshint esversion:11 */
const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(true);
  const [showBalance, setShowBalance] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  let isValid = (atmMode != "");

  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
    if (Number(event.target.value) <=0)
      setValidTransaction(false);
    else if (!isDeposit && (totalState - Number(event.target.value)) < 0)
      setValidTransaction(false);
    else
      setValidTransaction(true);
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;

    setTotalState(newTotal);
    newTotal = isDeposit ? newTotal + deposit : newTotal - deposit;
    setValidTransaction(newTotal >= 0);
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    if (event.target.value != "")
      setIsDeposit(event.target.value == 'Deposit');
    if (event.target.value == 'Deposit')
      setValidTransaction(true);
  };
  const handleShowBalanceCheck = (event) => {
    setShowBalance(event.target.checked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2><input type="checkbox" id="show-balance" name="show-balance" onChange={handleShowBalanceCheck} />Show Balance?
      { showBalance && <label id="total" className="balance">{status}</label> }
      </h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>      
      { isValid && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit> }
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
