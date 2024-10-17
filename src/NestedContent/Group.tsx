import { useContext, useMemo } from 'react';
import { TaskType, TaskContext } from '../App';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import TitleGroup from './NestedGroup/TitleGroup';
import Item from './NestedGroup/Item';
import './../style.css';

const Group = ({ id, index }: { id: string; index: number }) => {
  const [parent] = useAutoAnimate();
  const tasksContext = useContext<TaskType[] | undefined>(TaskContext);

  const filteredTasks = useMemo(() => {
    if (!tasksContext) return [];

    const tasksInGroup = tasksContext.filter(
      task => task.groupIndex === index && task.hidden === false);
    return tasksInGroup.sort((a, b) => b.priority - a.priority);
  }, [tasksContext, index]);

  const itemCount = filteredTasks.length;

  if (!tasksContext) {
    return null;
  }

  return (
    <article>
      <TitleGroup
        itemCount={itemCount}
        id={id}
      />
      <ul ref={parent}>
        {filteredTasks.map(task => (
          < Item
            key={task.id}
            id={task.id}
          />
        ))}
      </ul>
    </article>
  );
};

export default Group;
