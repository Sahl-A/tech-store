import { useReducer, useEffect } from 'react';

const useLocalStorageReducer = (reducer, key, defaultVal) => {
    // make piece of state based off of value in localStorage or default
    const [state, dispatch] = useReducer(reducer, defaultVal, ()=> {
        let val;
        try {
            val = JSON.parse(localStorage.getItem(key)) || String(defaultVal);
        } catch(e) {
            val = defaultVal;
        }
        return val;
    });
    // Use useEffect to update localStorage when state changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state, key]);
    return[state, dispatch]
}

export default useLocalStorageReducer;