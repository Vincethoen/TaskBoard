import { useContext } from 'react';
import { ThemeContext } from './../App';
import './../style.css';

const DarkMode = () => {
    const context = useContext<{
        darkMode: boolean;
        setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    }>(ThemeContext);

    if (!context) {
        return;
    }
    const { darkMode, setDarkMode } = context

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }


    return (
        <button className='btn-darkmode' onClick={toggleDarkMode}>
                {!darkMode ? '◯' : '☽'}
        </button>
    )
}

export default DarkMode