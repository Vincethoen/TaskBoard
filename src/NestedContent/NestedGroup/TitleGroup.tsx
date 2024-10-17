import { useContext, useState, useEffect, ChangeEvent } from 'react';
import { GroupType, GroupContext, GroupFunctionsType, GroupFunctionsContext } from '../../App';
import ItemCount from './NestedTitleGroup/ItemCount';
import './../../style.css';

const TitleGroup = ({ itemCount, id }: { itemCount: number, id: string; }) => {
  const groupContext = useContext<GroupType[] | undefined>(GroupContext);
  const functionContext = useContext<GroupFunctionsType | undefined>(GroupFunctionsContext)

  const [text, setText] = useState<string>(() => {
    const group = groupContext?.find(group => group.id === id);
    return group ? group.name : ''
  });
  const [edit, setEdit] = useState<boolean>(false);


  useEffect(() => {
    if (!edit) {
      if (text === '') {
        setText(getText)
      }
    }
  }, [text]);

  if (!groupContext || !functionContext) {
    return;
  }


  const getText = () => {
    if (!groupContext) {
      return '';
    }
    const group = groupContext.find(group => group.id === id);
    if (group) {
      return group.name;
    }
    return '';
  }

  const setNewText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const setEditMode = () => {
    setEdit(!edit);
  }

  function handleEditTask(e: any) {
    e.preventDefault();
    if (!functionContext) {
      return
    }
    functionContext.editGroup(text, id);
    setEditMode();
  }

  const handleGroupName = () => {
    if (groupContext !== undefined) {
      const group = groupContext.find((group) => group.id === id);
      if (group) {
        return group.name;
      }
      return 'Unknown id';
    }
    return 'Unknown name';
  }

  const handleRemoveGroup = (id: string) => {
    console.log('removing group with id: ', id)
    functionContext.removeGroup(id)
  };

  return (
    <div className='group-header'>
      <button onClick={() => handleRemoveGroup(id)}>
        <img src="../../../src/assets/delete_small.svg" alt="delete" />
      </button>
      <div className='group-input' onDoubleClick={setEditMode}>
        {edit ? (
          <form className="edit-form">
            <input
              type='text'
              value={text}
              onInput={setNewText}
              onBlur={(e) => handleEditTask(e)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEditTask(e);
                }
              }}
            />
          </form>
        ) : (
          <h2 className='group-name truncate'>{handleGroupName()}</h2>
        )}
      </div>
      <div className='item-count'>
        <ItemCount
          amountOfItems={itemCount} />
      </div>
    </div>
  )
}

export default TitleGroup