import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import pencil from './../assets/pencil.svg';
import person from './../assets/person.svg';
import '../style.css';

const NavButton = () => {
  const [taskPage, setTaskPage] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    setTaskPage(isTaskPage());
  }, [location])

  const isTaskPage = () => {
    return location.pathname !== "/people" ? true : false;
  }

  return (
    <>
      {
        taskPage ?
          <button className='btn-people'>
            <Link to="/people">
              <img className='btn-image' src={person} alt="people" />
            </Link>
          </button>
          :
          <button className='btn-tasks'>
            <Link to="/">
              <img className='btn-image' src={pencil} alt="tasks" />
            </Link>
          </button>
      }
    </>
  )
}

export default NavButton