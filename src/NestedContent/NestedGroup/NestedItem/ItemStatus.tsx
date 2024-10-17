import { useContext, useCallback } from 'react';
import { TaskType, TaskContext, TaskFunctionsType, TaskFunctionsContext } from '../../../App';
import '../../../style.css';
import ItemPriority from './ItemPriority';

const ItemStatus = ({ id }: { id: string; }) => {
  const taskContext = useContext<TaskType[] | undefined>(TaskContext);
  const taskFunctionsContext = useContext<TaskFunctionsType | undefined>(TaskFunctionsContext);

  if (!taskContext || !taskFunctionsContext) {
    console.error("Context not available.");
    return null;
  }
  
  const currentItem = taskContext.find(task => task.id === id);

  if (!currentItem) {
    console.error(`Task with id ${id} not found.`);
    return null;
  }

  const moveItem = useCallback((forward: boolean) => {
    if (forward) {
      console.log(`Moving task ${id} forward`);
      taskFunctionsContext.incrementTask(currentItem);
    } else {
      console.log(`Moving task ${id} backward`);
      taskFunctionsContext.decrementTask(currentItem);
    }
  }, [id, currentItem, taskFunctionsContext]);

  const handleRemoveItem = useCallback(() => {
    taskFunctionsContext.removeTask(id);
  }, [id, taskFunctionsContext]);

  return (
    <div className='status-container'>
      <ItemPriority id={id} />
      <button onClick={handleRemoveItem}>
        <img src="../../../src/assets/delete.svg" alt="delete" />
      </button>
      <button onClick={() => moveItem(false)}>
        <img src="../../../src/assets/previous.svg" alt="previous" />
      </button>
      <button onClick={() => moveItem(true)}>
        <img src="../../../src/assets/next.svg" alt="next" />
      </button>
    </div>
  );
}

export default ItemStatus;
