import React, {useState, useEffect} from 'react'
import './main.css'
import CurrencySelector from "./components/currencySelector/currencySelector";
import ConvertorForm from "./components/convertor/convertorForm";
import ConvertsHistory from "./components/convertsHistory/convertsHistory";

export const navigationTabs = [
    {
        name: 'Конвертация'
    },
    {
        name: 'История конвертаций'
    }
]

function App() {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [cashBeforeConvert, setCashBeforeConvert] = useState(0);
    const [cashAfterConvert, setCashAfterConvert] = useState(0);
    const [activeTab, setActiveTab] = useState(navigationTabs[0].name);
    const [operationsHistory, setOperationsHistory] = useState([]); // эту историю ты выводишь когда активна вторая таба c историей

    const base_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=4fdc37adda39c438294529349707fadb"
    const convert_URL = "https://api.m3o.com/v1/currency/Convert?from=FROM_CURRENCY&to=TO_CURRENCY&amount=AMOUNT"

    const convertCurrency = () => {
        fetch(convert_URL.replace('FROM_CURRENCY', fromCurrency)
            .replace('TO_CURRENCY', toCurrency)
            .replace('AMOUNT', cashBeforeConvert.toString()), {
            headers: new Headers({
                'Authorization': 'Bearer NDE0ZTlkN2EtNzY1Ny00MmI2LWExYjAtMzQxMjQ2OWMwNTc4'
            })
        })
            .then(res => res.json())
            .then(data => {
                data.amount && setCashAfterConvert(data.amount)
            })
        setOperationsHistory([{
            time: new Date().toLocaleDateString(),
            fromCurrency: fromCurrency,
            fromCash: cashBeforeConvert,
            toCurrency: toCurrency,
            toCash: cashAfterConvert
        }, ...operationsHistory])
    }

    useEffect(() => {
        fetch(base_URL)
            .then(res => res.json())
            .then(data => {
                const currenciesList = Object.keys(data.rates);
                const firstCurrencyFrom = currenciesList[0]
                setFromCurrency(data.base)
                setToCurrency(firstCurrencyFrom)
                setCurrencies(currenciesList)

            })
    }, [])

    const displayActiveTabContent = () => {
        switch (activeTab) {
            case navigationTabs[0].name:
                return <ConvertorForm currencies={currencies}
                                      cashAfterConvert={cashAfterConvert}
                                      convertCurrency={convertCurrency}
                                      fromCurrency={fromCurrency}
                                      setFromCurrency={setFromCurrency}
                                      setToCurrency={setToCurrency}
                                      toCurrency={toCurrency}
                                      setCashBeforeConvert={setCashBeforeConvert}
                                      cashBeforeConvert={cashBeforeConvert} />;
            case navigationTabs[1].name:
                return <ConvertsHistory />;
            default: return null
        }
    }


    return (
        <div className="page-container">
            <div className={'navigation-tabs'}>
                {navigationTabs.map(navTab => <div key={navTab.name}
                                                   onClick={() => setActiveTab(navTab.name)}
                                                   className={`navigation-tab ${activeTab === navTab.name ? 'active' : ''}`}>
                    {navTab.name}
                </div>)}
            </div>
            <div className={'tabs-content'}>
                {displayActiveTabContent()}
            </div>

        </div>
    );
}

export default App;
