import React, { useState, useCallback } from 'react';
import AutoComplete from './ui/AutoComplete/AutoComplete';
import getUsersMatch from './api/getUsersMatch';
import getProductsMatch from './api/getProductsMatch';

type stateT = {
    productName: string;
    matchProducts: Record<string, string>[];
    productsLoading: boolean;
    userName: string;
    matchUsers: Record<string, string>[];
    usersLoading: boolean;
}

function App() {
    const [state, setState] = useState<stateT>({
        productName: '',
        matchProducts: [],
        productsLoading: false,
        userName: '',
        matchUsers: [],
        usersLoading: false,
    });
    const { matchUsers, usersLoading, matchProducts, productsLoading, productName, userName } = state;

    const productsSearchHandle = useCallback(
        (searchStr: string) => {
            setState((prev) => ({ ...prev, productsLoading: true }));
            getProductsMatch(searchStr)
                .then((data: any) => {
                    setState((prev) => ({
                        ...prev,
                        matchProducts: data,
                        productsLoading: false,
                    }));
                })
                .catch((err) => {
                    console.log(err);
                });
        }, []
    )

    const usersSearchHandler = useCallback(
        (searchStr: string) => {
            setState((prev) => ({ ...prev, usersLoading: true }));
            getUsersMatch(searchStr)
                .then((data: any) => {
                    setState((prev) => ({
                        ...prev,
                        matchUsers: data,
                        usersLoading: false,
                    }));
                })
                .catch((err) => {
                    console.log(err);
                });
        }, []
    );

    const handleChange = useCallback(
        (name: string, value: string, isAutocomplete?: boolean) => {
            const matchedDataKey: Record<string, string> = { productName: 'matchProducts', userName: 'matchUsers' };
            const isValueEmpty = value === '';
            setState((prev) => {
                return {
                    ...prev,
                    [name]: value,
                    ...(isAutocomplete || isValueEmpty ? {
                        [matchedDataKey[name]]: []
                    } : {}),
                }
            })
        }, []
    );

    const showFilledData = () => {
        const userNameTxt = `user name is ${userName}`;
        const productNameTxt = `selected product is ${productName}`;
        alert(`${userName && userNameTxt} ${(userName && productName) && 'and'} ${productName && productNameTxt}`);
    }

    return (
        <div className="app">
            <div className="container">
                <div>
                    <AutoComplete
                        onProcessSearch={usersSearchHandler}
                        onChange={handleChange}
                        placeholder="Search for users"
                        fieldName="userName"
                        options={matchUsers}
                        loading={usersLoading}
                        value={userName}
                    />
                </div>
                <div>
                    <AutoComplete
                        onProcessSearch={productsSearchHandle}
                        onChange={handleChange}
                        placeholder="Search for products"
                        fieldName="productName"
                        options={matchProducts}
                        loading={productsLoading}
                        value={productName}
                    />
                </div>
                {
                    (userName || productName) && (
                        <div>
                            <button type="button" onClick={showFilledData}>
                                Click to see names
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
