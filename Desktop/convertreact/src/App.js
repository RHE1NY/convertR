import React, {useState, useEffect} from 'react'
import './main.css'
import ConvertorForm from "./components/convertor/convertorForm";
import ConvertsHistory from "./components/convertsHistory/convertsHistory";
import axios from 'axios';
import {useDispatch} from "react-redux";


export const navigationTabs = [
    {
        name: 'Конвертация'
    },
    {
        name: 'История конвертаций'
    },
]


function App() {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [cashBeforeConvert, setCashBeforeConvert] = useState(0);
    const [cashAfterConvert, setCashAfterConvert] = useState(0);
    const [activeTab, setActiveTab] = useState(navigationTabs[0].name);
    const [loader, setLoader] = useState(false);

    const base_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=bfd8f810c5a8f1cc1c0bfc183a84aea9";

    const dispatch = useDispatch();

    async function convertCurrency() {
        setLoader(true);
        await axios.get(`https://api.m3o.com/v1/currency/Convert?from=${fromCurrency}&to=${toCurrency}&amount=${cashBeforeConvert.toString()}`, {
            headers: {
                'Authorization': 'Bearer NDE0ZTlkN2EtNzY1Ny00MmI2LWExYjAtMzQxMjQ2OWMwNTc4',
            }
        }).then(res => {
            res.data.amount && setCashAfterConvert(res.data.amount)
            setLoader(false);
            dispatch({
                type: "ADD_HISTORY",
                payload: {cashBeforeConvert, fromCurrency, toCurrency, cashAfterConvert: res.data.amount}
            })
        })
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
                                      setLoader={setLoader}
                                      loader={loader}
                                      cashAfterConvert={cashAfterConvert}
                                      convertCurrency={convertCurrency}
                                      fromCurrency={fromCurrency}
                                      setFromCurrency={setFromCurrency}
                                      setToCurrency={setToCurrency}
                                      toCurrency={toCurrency}
                                      setCashBeforeConvert={setCashBeforeConvert}
                                      cashBeforeConvert={cashBeforeConvert}/>;
            case navigationTabs[1].name:
                return <ConvertsHistory/>;
            default:
                return null
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
