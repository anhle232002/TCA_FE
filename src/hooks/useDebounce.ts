import { useEffect, useRef, useState } from "react";

export const useDebounceValue = <T>(value: T, delay: number) => {
    const [debounceValue, setDebounceValue] = useState<T>(value);
    const [debouncing, setDebouncing] = useState(false);
    const timeoutHolder = useRef<number>();
    useEffect(() => {
        setDebouncing(true);
        timeoutHolder.current = window.setTimeout(() => {
            setDebounceValue(value);
            setDebouncing(false);
        }, delay);

        return () => {
            window.clearTimeout(timeoutHolder.current);
        };
    }, [value, delay]);

    return { debouncing, debounceValue };
};
