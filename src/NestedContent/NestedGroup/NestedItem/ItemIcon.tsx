import { useContext, useState, useEffect } from 'react';
import { TaskType, TaskContext, TaskFunctionsType, TaskFunctionsContext } from '../../../App';
import '../../../../src/style.css';

const ItemIcon = ({ id }: { id: string }) => {
  const context = useContext<TaskType[] | undefined>(TaskContext);
  const functionContext = useContext<TaskFunctionsType | undefined>(TaskFunctionsContext);

  const [icon, setIcon] = useState<string>(() => {
    const task = context?.find(task => task.id == id);
    return task ? task.icon : ''
  });

  useEffect(() => {
    if (context) {
      const task = context.find(task => task.id === id);
      if (task) {
        setIcon(task.icon);
      }
    }
  }, [id, context]);

  if (!functionContext || !context) {
    return null;
  }

  const newIcon = () => {
    const newIcon: void = functionContext.newRandomIcon(id);

    setIcon(`${newIcon}`);
  }

  return (
    <img src={icon} alt="Item Icon" onDoubleClick={newIcon} />
  );
}

export default ItemIcon;
