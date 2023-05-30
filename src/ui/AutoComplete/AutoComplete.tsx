import React, { useState, FC, useRef } from 'react';
import styles from './index.module.scss';
import CloseIcon from './assets/close.svg';

type AutoCompleteProps = {
    onProcessSearch: (val: string) => void;
    onChange: (name: string, val: string) => void;
    placeholder: string;
    fieldName: string;
    throttleTime?: number;
    disabled?: boolean;
};

const AutoComplete: FC<AutoCompleteProps> = ({
                                                 onProcessSearch,
                                                 onChange,
                                                 placeholder ,
                                                 fieldName,
                                                 throttleTime = 300,
                                                 disabled = false,
    }) => {
    const [state, seState] = useState({
        value: ''
    });
    const { value } = state;
    const intervalId = useRef<null | number>(null);

    const onChangeHandler = (event: { target: { value: any; }; }) => {
        if (intervalId.current) clearInterval(intervalId.current);
        const newVal = event.target.value;
        onChange(fieldName, newVal);
        seState((prev) => ({
            ...prev,
            value: newVal
        }));
        intervalId.current = window.setTimeout(() => {
            onProcessSearch(newVal);
        }, throttleTime);
    }

    const clearSearchKey = () => {
        onChange(fieldName, '');
        seState((prev) => ({
            ...prev,
            value: ''
        }));
    }

    return (
        <div className={styles.autoComplete}>
            <input
                className={styles.inputField}
                onChange={onChangeHandler}
                placeholder={placeholder}
                type="text"
                value={value}
                disabled={disabled}
            />
            {
                value && (
                    <button type="button" className={styles.clearBtn} onClick={clearSearchKey}>
                        <img src={CloseIcon} alt="" />
                    </button>
                )
            }
        </div>
    );
}

export default AutoComplete;
