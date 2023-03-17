import { useEffect, useLayoutEffect, useState } from "react";

export const useDarkMode = () => {
    const [isEnabled, setIsEnabled] = useState(!!localStorage.getItem("theme") || false);

    const handleToggleDarkMode = (value: boolean) => {
        setIsEnabled(value);
        localStorage.setItem("theme", value ? "dark" : "light");
    };

    useLayoutEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        const enabled = typeof savedTheme !== undefined && savedTheme === "dark" ? true : false;

        setIsEnabled(enabled);
    }, []);

    useLayoutEffect(
        () => {
            console.log(isEnabled);

            const className = "dark";
            const element = window.document.body;
            if (isEnabled) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        },
        [isEnabled] // Only re-call effect when value changes
    );

    return { isEnabled, handleToggleDarkMode };
};
