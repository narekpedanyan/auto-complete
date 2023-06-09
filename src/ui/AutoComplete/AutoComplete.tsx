import React, {useState, FC, useRef, useCallback} from 'react';
import cn from 'classnames';
import styles from './index.module.scss';
import CloseIcon from './assets/close.svg';
import useOutsideClick from './hooks/useOutsideClick';

type AutoCompleteProps = {
    onProcessSearch: (val: string) => void;
    onChange: (name: string, val: string, isAutocomplete?: boolean) => void;
    options: Record<string, any>;
    placeholder: string;
    fieldName: string;
    loading: boolean;
    value: string;
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
     loading,
     value
    }) => {
    const [focused, setFocused] = useState(false);
    const intervalId = useRef<null | number>(null);
    const elementRef = useRef(null);

    useOutsideClick(elementRef, () => setFocused(false));

    const onChangeHandler = (event: { target: { value: string; }; }) => {
        if (intervalId.current) clearInterval(intervalId.current);
        const newVal = event.target.value;
        onChange(fieldName, newVal);
        if (newVal) {
            intervalId.current = window.setTimeout(() => {
                onProcessSearch(newVal);
            }, throttleTime);
        }
    }

    const onSelect = (newVal: string) => {
        onChange(fieldName, newVal, true);
        setFocused(false);
    }

    const clearSearchKey = () => {
        onChange(fieldName, '');
    }

    const getMarkedLabel = useCallback(
        (label: string) => {
            const regex = new RegExp( '(' + value + ')', 'gi' );
            return label.replace(regex, "<span>$1</span>" );
        },
        [value]
    )

    return (
        <div className={styles.autoComplete} ref={elementRef}>
            <input
                onFocus={() => setFocused(true)}
                className={styles.inputField}
                onChange={onChangeHandler}
                placeholder={placeholder}
                type="text"
                value={value}
                disabled={disabled}
            />
            {
                focused && options.length > 0 && (
                    <div
                        className={cn(styles.autocompleteOptions, loading ? styles.loading : null)}>
                        {
                            options.map((item: Record<string, string>, index: number) => (
                                    <div key={`${item.name}${index}`}
                                         data-testid="option"
                                         className={styles.optionItem}
                                         onClick={() => onSelect(item.name)}
                                         role="presentation"
                                         dangerouslySetInnerHTML={{ __html: getMarkedLabel(item.name)}}
                                    />
                                )
                            )
                        }
                    </div>
                )
            }
            {
                value && (
                    <button
                        data-testid="clear"
                        type="button"
                        className={styles.clearBtn}
                        onClick={clearSearchKey}
                    >
                        <img src={CloseIcon} alt="" />
                    </button>
                )
            }
        </div>
    );
}

export default AutoComplete;
