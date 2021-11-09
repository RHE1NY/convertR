import React, {useState,useMemo} from 'react'
import './convertsHistory.css'
import {createStore} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {historyReducer} from "../../store/historyReducer";



const ConvertsHistory = ({
                             operationsHistory,
                             cashAfterConvert,
                             cashBeforeConvert,
                             setOperationsHistory,
                         }) => {

    const dispatch = useDispatch();
    const historyOps = useSelector(state => state.historee);

    const sorting = () => {
        if (historyOps==0) {
            alert("Нечего сортировать")
        }
      if (historyOps) {
          {/*  const sorted = [...historyOps].sort((a,b) => a[fieldCash]<b[fieldCash] ? 1 : -1);
          setSort(sorted);
         setOperationsHistory(sorted); */}
          dispatch({type: "SORT_HISTORY", payload: cashBeforeConvert})
      }
    }



    return (
    <div>
    <div className={"forma-label"}>  История конвертаций </div>

    <label className={"sorts"} onClick={() =>sorting("cashBeforeConvert")}>Сортировка по бабкам</label>
        <label className={"sorts"} onClick={() => sorting()}>Сортировка по результату</label>
        {/*     <div className={"formach"}>
        {operationsHistory.map(historyItem => <div className={"options"}>
            <option key={historyItem} className={"res"}>{historyItem.fromCash}</option><option className={"from"}>{historyItem.fromCurrency} IN</option>
            <option className={"from"}>{historyItem.toCurrency}</option><option className={"res"}>{historyItem.toCash}</option>
        </div>  )}</div>
        {operationsHistory.length !==0 ?  <label/> : <h1 style={{textAlign: 'center', fontSize: '20px'}}>Операций еще нет</h1>
        }      */}
        <div className={"formach"}>

        {historyOps.map(historyItems =>
            <div className={"options"}> <option key={historyItems} className={"from"}>{historyItems}</option>
            </div>   )}</div>
        {historyOps.length !==0 ?  <label/> : <h1 style={{textAlign: 'center', fontSize: '20px'}}>Операций еще нет</h1>}
    </div>
    )
}

export default ConvertsHistory
