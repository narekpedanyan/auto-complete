import React, { useState, FC, useRef } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';
import CloseIcon from './assets/close.svg';

type AutoCompleteProps = {
    onProcessSearch: (val: string) => void;
    onChange: (name: string, val: string, isAutocomplete?: boolean) => void;
    options: Record<string, any>;
    placeholder: string;
    fieldName: string;
    loading: boolean;
    throttleTime?: number;
    disabled?: boolean;
};

const AutoComplete: FC<AutoCompleteProps> = ({
                                                 onProcessSearch,
                                                 onChange,
                                                 options = [],
                                                 placeholder ,
                                                 fieldName,
                                                 throttleTime = 300,
                                                 disabled = false,
    loading
    }) => {
    const [state, seState] = useState({
        value: '',
        focused: false
    });
    const { value, focused } = state;
    const intervalId = useRef<null | number>(null);

    const onChangeHandler = (event: { target: { value: any; }; }) => {
        if (intervalId.current) clearInterval(intervalId.current);
        const newVal = event.target.value;
        onChange(fieldName, newVal);
        seState((prev) => ({
            ...prev,
            value: newVal
        }));
        if (newVal) {
            intervalId.current = window.setTimeout(() => {
                onProcessSearch(newVal);
            }, throttleTime);
        }
    }

    const onSelect = (newVal: string) => {
        onChange(fieldName, newVal, true);
        seState((prev) => ({
            ...prev,
            value: newVal,
            focused: false
        }));
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
                onFocus={() => seState({ ...state, focused: true })}
                className={styles.inputField}
                onChange={onChangeHandler}
                placeholder={placeholder}
                type="text"
                value={value}
                disabled={disabled}
            />
            {
                focused && options.length > 0 && (
                    <div className={cn(styles.autocompleteOptions, loading ? styles.loading : null)}>
                        {
                            options.map((item: Record<string, string>, index: number) => (
                                <div key={`${item.name}${index}`}
                                     className={styles.optionItem}
                                     onClick={() => onSelect(item.name)}
                                >
                                    {item.name}
                                </div>)
                            )
                        }
                    </div>
                )
            }
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
