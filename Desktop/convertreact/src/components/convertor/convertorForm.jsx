import CurrencySelector from "../currencySelector/currencySelector";
import React from "react";
import './convertorForm.css';
import Loader from "../loader/Loader";

const ConvertorForm = ({
                           currencies, cashBeforeConvert,
                           setCashBeforeConvert, fromCurrency,
                           setFromCurrency, toCurrency,
                           setToCurrency, convertCurrency, cashAfterConvert, loader,
    setLoader
                       }) => {


    return (
        <div className="currency-convertor-form tab-content">
            <div className={'form-converter'}>
                <div className={'form-side'}>
                    <div className={'form-label'}>Текущая валюта:</div>
                    <input type="number"
                           id={'from-currency'}
                           value={cashBeforeConvert}
                           onChange={(e) => setCashBeforeConvert(e.target.value)}
                           placeholder="Введите значение"
                    />
                    <CurrencySelector
                        currencies={currencies}
                        selectedCurrency={fromCurrency}
                        changeCurrency={e => setFromCurrency(e.target.value)}/>
                </div>
                <div className={'form-side'}>
                    <div className={'form-label'}>Выберите валюту для обмена:</div>
                    <CurrencySelector
                        selectedCurrency={toCurrency}
                        currencies={currencies}
                        changeCurrency={e => setToCurrency(e.target.value)}
                    />
                </div>
            </div>
            <button className="convert-btn" onClick={convertCurrency}>Конвертировать</button>
            {loader
                ? <div className={"loaderDiv"}><Loader/></div>
                :
                !!cashAfterConvert && <div className={'convert-result'}>
                <span> Результат: {cashAfterConvert} </span>

                </div>

            }
        </div>
    );
};

export default ConvertorForm;
