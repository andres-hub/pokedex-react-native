import { useEffect, useState } from "react"


export const useDebouncedValue = (input: string = '', time: number = 500) => {
    const [debonceValue, setDebonceValue] = useState(input);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setDebonceValue(input);
        }, time);

        return () => {
            clearTimeout(timeout);
        }

    }, [input]);


    return debonceValue;

}
