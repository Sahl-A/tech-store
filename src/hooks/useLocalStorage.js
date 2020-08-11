import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultVal) => {
    // make piece of state based off of value in localStorage or default
    const [state, setState] = useState(()=> {
        let val;
        try {
            val = JSON.parse(localStorage.getItem(key)) || (defaultVal);
        } catch(e) {
            val = defaultVal;
        }
        return val;
    });
    // Use useEffect to update localStorage when state changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state, key]);
    return[state, setState]
}

export default useLocalStorage;