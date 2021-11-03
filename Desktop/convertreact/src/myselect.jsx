import React, {useState} from 'react';

const Myselect = ({props, convert,selectedCurrency, changeCurrency}) => {



    return (
       <select value={selectedCurrency} onChange={changeCurrency}>
           {convert.map(option =>(
               <option key={option} value={option}>{option}</option>
               )
           )}
       </select>
    );
};

export default Myselect;