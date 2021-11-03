import React, {useState,useMemo} from 'react'
import './convertsHistory.css'

const ConvertsHistory = ({
                             operationsHistory,
                             fromCurrency,
                             setFromCurrency,
                             setToCurrency,
                             toCurrency,
                             cashAfterConvert,
                             cashBeforeConvert,
                             setOperationsHistory,
                         }) => {

    const [sort, setSort] = useState('');

    const sorting = (fieldCash) => {
        if (operationsHistory==0) {
            alert("Нечего сортировать")
        }
      if (operationsHistory) {
          const sorted = [...operationsHistory].sort((a,b) => a[fieldCash]<b[fieldCash] ? 1 : -1);
          setSort(sorted);
          setOperationsHistory(sorted);
      }
    }



    return (
    <div>
    <div className={"forma-label"}>  История конвертаций </div>

    <label className={"sorts"} onClick={() =>sorting("fromCash")}>Сортировка по бабкам</label>
        <label className={"sorts"} onClick={() => sorting("toCash")}>Сортировка по результату</label>
    <div className={"formach"}>
        {operationsHistory.map(historyItem => <div className={"options"}>
            <option className={"res"}>{historyItem.fromCash}</option><option className={"from"}>{historyItem.fromCurrency} IN</option>
            <option className={"from"}>{historyItem.toCurrency}</option><option className={"res"}>{historyItem.toCash}</option>
        </div>  )}</div>
        {operationsHistory.length !==0 ?  <label/> : <h1 style={{textAlign: 'center', fontSize: '20px'}}>Операций еще нет</h1>
        }
    </div>
    )
}

export default ConvertsHistory
