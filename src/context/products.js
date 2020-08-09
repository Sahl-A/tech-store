import React from 'react';

export const ProductContext = React.createContext();

export const ProductProvider = ({children}) => {
    const dummyValue = {
        greeting: 'hello',
        product: {id:1 , title: 'product title'}
    };

    return(
        <ProductContext.Provider value={dummyValue}>
            {children}
        </ProductContext.Provider>
    )
}
