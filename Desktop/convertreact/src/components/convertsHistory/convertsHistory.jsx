import React from 'react'
import './convertsHistory.css'
import {useDispatch, useSelector} from "react-redux";


const ConvertsHistory = () => {

    const dispatch = useDispatch();
    const historyOps = useSelector(state => state.history);

    const sorting = (sortField) => {
        if (historyOps.length === 0) {
            alert("Нечего сортировать")
        }
        if (historyOps.length) {
            dispatch({type: "SORT_HISTORY", payload: sortField})
        }
    }


    return (
        <div>
            <div className={"forma-label"}> История конвертаций</div>

            <label className={"sorts"} onClick={() => sorting("cashBeforeConvert")}>Сортировка по бабкам</label>
            <label className={"sorts"} onClick={() => sorting("cashAfterConvert")}>Сортировка по результату</label>
            <div className={"formach"}>
                {historyOps.map(historyItem => <div className={"options"}>
                    <option key={historyItem} className={"res"}>{historyItem.cashBeforeConvert}</option>
                    <option className={"from"}>{historyItem.fromCurrency} IN</option>
                    <option className={"from"}>{historyItem.toCurrency}</option>
                    <option className={"res"}>{historyItem.cashAfterConvert}</option>
                </div>)}
            </div>
            {historyOps.length !== 0 ? <label/> :
                <h1 style={{textAlign: 'center', fontSize: '20px'}}>Операций еще нет</h1>}
        </div>
    )
}

export default ConvertsHistory
