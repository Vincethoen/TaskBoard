import { useContext } from 'react';
import DarkMode from './NestedHeader/DarkMode';
import NavButton from './NestedHeader/NavButton';
import { ThemeContext } from './App';
import './style.css';

const Header = () => {
  const context = useContext<{
      darkMode: boolean;
      setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  }>(ThemeContext);

  const { darkMode } = context

  if (!context) {
      return;
  }
  
  
  return (
    <header>
      <div className='title-container' data-theme={darkMode ? 'dark' : 'light'}>
        <h1 className='title' data-theme={darkMode ? 'dark' : 'light'}>
          TaskBoard
        </h1>
        <NavButton />
        <DarkMode />
      </div>
    </header>
  )
}

export default Header