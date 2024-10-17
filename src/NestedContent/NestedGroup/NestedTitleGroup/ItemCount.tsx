import { useContext } from 'react';
import { TaskType, TaskContext } from '../../../App';


const ItemCount = ({ amountOfItems } :props) => {
  const taskContext = useContext<TaskType[] | undefined>(TaskContext);

  return (
    <h2>{amountOfItems}</h2>
  )
}

export default ItemCount