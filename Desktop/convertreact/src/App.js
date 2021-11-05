import React, {useState, useEffect} from 'react'
import classes from './main.css'
import Myselect from "./myselect";
import Myselectfrom from "./Myselectfrom";

function App() {

    const [convert, setConvert] = useState([]);
    const [fromCurrency, setfromCurrency] = useState();
    const [toCurrency, settoCurrency] = useState();
    const [cash, setCash] = useState(0);
    const [exchange, setExchange] = useState(0);

    const base_URl = "http://api.exchangeratesapi.io/v1/latest?access_key=4fdc37adda39c438294529349707fadb"


    function Convertion(){

        setCash(cash[fromCurrency] * exchange / cash[toCurrency], 2);

        console.log (exchange);
    }

 useEffect(() => {
 fetch(base_URl)
     .then(res=>res.json())
     .then(data=> {
         const currency = Object.keys(data.rates)[0]
         setConvert([data.base, ...Object.keys(data.rates)])
          setfromCurrency(data.base)
           settoCurrency(currency)
           setExchange(data.rates[currency]);

     })
    }, [])




  return (
    <div className="App">
            <div>
                <h1 className="tab_1" style={{marginLeft: "30px", fontSize:"35px"}}>Конвертации</h1>
                <h1 className="tab_2" style={{margin: "-60px 260px", }}>История</h1>
                <br/>
                <br/>
                <div className="form-table">
                <input type="text"
                       cash={cash}

                       placeholder="Введите значение"
                />
 <Myselect
     convert = {convert}
     selectedCurrency={fromCurrency}
     changeCurrency={e=>setfromCurrency(e.target.value)}
 />
                <br/>
                <label>Выберите валюту для обмена:</label>
                <Myselect
                    selectedCurrency={toCurrency}
                    convert = {convert}
                    changeCurrency={e=>settoCurrency(e.target.value)}
                />
                <button className="knopka" onClick={Convertion}>Конвертировать</button>
                    <label>{cash}</label>
                </div>
            </div>
            </div>
  );
}

export default App;
