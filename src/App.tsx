import React, { useState, useCallback } from 'react';
import AutoComplete from './ui/AutoComplete/AutoComplete';

function App() {
    const [state, setState] = useState({
        productName: '',
        userName: ''
    });
    console.log(state, 'state');

    const handleChange = useCallback(
        (name: string, value: string) => {
            setState((prev) => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        }, []
    );

    const productsSearchHandle = (searchStr: string) => {
        console.log(searchStr, 'productsSearchHandle');
    }
    return (
        <div className="app">
            <AutoComplete
              onProcessSearch={productsSearchHandle}
              onChange={handleChange}
              placeholder="Search for products"
              throttleTime={2000}
              fieldName="productName"
            />
        </div>
    );
}

export default App;
