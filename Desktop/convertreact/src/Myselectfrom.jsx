import React, {useState} from 'react';

const Myselectfrom = ({props,values}) => {
    const [from, setFrom] = useState({id: "BEL"},
        {id: "EUR"},
        {id: "RUB"},
        {id: "USD"}
    );

    return (
        <select
            onChange={e=>setFrom(e.target.value)}
        >
            {props.map( values=>(
                <option key={values} value={values.id}>{values.id}</option>
            ))}
        </select>
    );
};

export default Myselectfrom;