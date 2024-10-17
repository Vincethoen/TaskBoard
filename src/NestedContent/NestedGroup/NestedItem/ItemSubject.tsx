import { useContext, useState, useEffect, ChangeEvent } from 'react';
import { TaskType, TaskContext, TaskFunctionsType, TaskFunctionsContext } from '../../../App';
import '../../../../src/style.css';

const ItemSubject = ({ id }: { id: string; }) => {
  const context = useContext<TaskType[] | undefined>(TaskContext);

  const [text, setText] = useState<string>(() => {
    const task = context?.find(task => task.id === id);
    return task ? task.subject : '';
  });
  const [edit, setEdit] = useState<boolean>(false);

  const functionContext = useContext<TaskFunctionsType | undefined>(TaskFunctionsContext);

  useEffect(() => {
    if (context && text === '') {
      const task = context.find(task => task.id === id);
      if (task) {
        setText(task.subject);
      }
    }
  }, [context, id, text]);

  const setNewText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const setEditMode = () => {
    setEdit(!edit);
  };

  function handleEditSubject(e: any) {
    e.preventDefault();
    if (functionContext) {
      functionContext.editSubject(text, id);
    }
    setEditMode();
  };

  return (
    <div
    className='item-subject' 
    onDoubleClick={setEditMode}>
      {edit ? (
        <form className="edit-form">
          <input
            type='text'
            value={text}
            onInput={setNewText}
            onBlur={(e) => handleEditSubject(e)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEditSubject(e);
              }
            }}
          />
        </form>
      ) : (
        <p className='item-subject truncate'>
          {text}
        </p>
      )}
    </div>
  );
}

export default ItemSubject;