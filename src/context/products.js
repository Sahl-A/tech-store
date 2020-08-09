import React from 'react';

export const ProductContext = React.createContext();

export const ProductProvider = ({children}) => {
    // Set the needed values
    const [loading, setLoading] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [featured, setFeatured] = React.useState([]);

    return(
        <ProductContext.Provider value={{loading, products, featured}}>
            {children}
        </ProductContext.Provider>
    )
}
