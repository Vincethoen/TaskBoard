import { useContext, useMemo } from 'react';
import { GroupType, GroupContext } from './App';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Group from './NestedContent/Group';
import './style.css';
import AddTask from './NestedHeader/AddTask';
import AddGroup from './NestedHeader/AddGroup';
import SearchTask from './NestedHeader/SearchTask';
import { ThemeContext } from './App';

const Content = () => {
  const contextDarkMode = useContext<{
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  }>(ThemeContext);
  const [parent] = useAutoAnimate();
  const context = useContext<GroupType[] | undefined>(GroupContext);

  const theme = useMemo(() => (contextDarkMode.darkMode ? 'dark' : 'light'), [contextDarkMode.darkMode]);

  if (!context) {
    return null;
  }

  return (
    <>
      <div className='btn-container' data-theme={theme}>
        <AddTask />
        <AddGroup />
        <SearchTask />
      </div>
      <section ref={parent}>
        {
          context.length < 1 ?
            <div >
              <p style={{ opacity: 0.5, marginLeft: '50vw', textAlign: 'center', width: '512px', transform: 'translateX(-50%)' }}>
                No tasks / groups <br />
                <span style={{ fontSize: '12px' }}>
                  Double click to edit names and icons.
                </span>
              </p>
            </div>
            :
            context.map((group, i: number) => (
              <Group
                key={group.id}
                id={group.id}
                index={i}
              />
            ))}
      </section >
    </>
  );
}

export default Content;
