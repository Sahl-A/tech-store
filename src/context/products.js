import React from 'react';
import URL from '../utils/URL';
import axios from 'axios';

export const ProductContext = React.createContext();

export const ProductProvider = ({children}) => {
    // Set the needed values
    const [loading, setLoading] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [featured, setFeatured] = React.useState([]);

    // Get the data from the server
    React.useEffect(()=>{
        setLoading(true);
        axios.get(`${URL}/products`)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            });
        return () => {};
    }, []);

    return(
        <ProductContext.Provider value={{loading, products, featured}}>
            {children}
        </ProductContext.Provider>
    )
}
