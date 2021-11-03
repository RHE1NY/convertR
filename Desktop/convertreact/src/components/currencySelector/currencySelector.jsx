import React from 'react';

const CurrencySelector = ({currencies, selectedCurrency, changeCurrency}) => {


    return (
        <select value={selectedCurrency} onChange={changeCurrency}>
            {currencies.map(option => (
                    <option key={option} value={option}>{option}</option>
                )
            )}
        </select>
    );
};

export default CurrencySelector;
