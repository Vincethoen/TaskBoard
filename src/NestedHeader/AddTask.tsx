import { useContext } from 'react';
import { TaskFunctionsType, TaskFunctionsContext } from '../App';
import '../style.css';

const AddTask = () => {
  
  const context = useContext<TaskFunctionsType | undefined>(TaskFunctionsContext);

  if (!context) {
    return null;
  }

  return (
      <button onClick={context.addTask} className='add-group-button'>
        Add Task
      </button>
  );
};

export default AddTask