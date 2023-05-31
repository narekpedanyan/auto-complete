import React, { useEffect } from 'react';

const useOutsideClick = (ref: React.RefObject<HTMLInputElement>, callback: () => void) => {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}

export default useOutsideClick;
