import { useContext, useState, useEffect, ChangeEvent } from 'react';
import { TaskType, TaskContext, TaskFunctionsType, TaskFunctionsContext } from '../../../App';
import '../../../style.css';

const ItemInput = ({ id }: { id: string; }) => {
  const context = useContext<TaskType[] | undefined>(TaskContext);
  const functionContext = useContext<TaskFunctionsType | undefined>(TaskFunctionsContext);

  const [text, setText] = useState<string>(() => {
    const task = context?.find(task => task.id === id);
    return task ? task.task : '';
  });
  const [edit, setEdit] = useState<boolean>(true);
  const [justCreated, setJustCreated] = useState<boolean>(true);

  useEffect(() => {
    if (context && text === '') {
      const task = context.find(task => task.id === id);
      if (task) {
        setText(task.task);
      }
    }
  }, [context, id, text]);

  const setNewText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const setUpStart = (e: ChangeEvent<HTMLInputElement>) => {
    if (justCreated) {
      e.target.select();
      setJustCreated(false);
    }
  };

  const setEditMode = () => {
    setEdit(!edit);
  };

  const handleEditTask = (e: any) => {
    e.preventDefault();
    if (functionContext) {
      functionContext.editTask(text, id);
    }
    setEditMode();
  };

  return (
    <div className='item-input' onDoubleClick={setEditMode}>
      {edit ? (
        <form className="edit-form">
          <input
            type='text'
            value={text}
            onInput={setNewText}
            onBeforeInput={setUpStart}
            onBlur={handleEditTask}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEditTask(e);
              }
            }}
          />
        </form>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};

export default ItemInput;