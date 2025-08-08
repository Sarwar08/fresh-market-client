import React, { useEffect, useState } from 'react'

const ThemeController = () => {

    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme])

    const themes = ["dark", "light"];

    const toggleTheme = () => {
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        // console.log(currentIndex,themes.length,nextIndex);
        setTheme(themes[nextIndex]);
    }

    return (
        <div>
            <button className='btn btn-ghost' onClick={toggleTheme} aria-label='Toggle Theme'>
                {theme === "dark" && "🌙 Dark"}
                {theme === "light" && "🌞 Light"}
            </button>
        </div>
    )
}

export default ThemeController