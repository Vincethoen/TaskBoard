import { useContext } from 'react';
import { GroupFunctionsType, GroupFunctionsContext } from '../App';
import '../style.css';

const AddGroup = () => {

  const context = useContext<GroupFunctionsType | undefined>(GroupFunctionsContext);

  if (!context) {
    return null;
  }

  return (
    <>
      <button onClick={context.addGroup} className='add-group-button'>
        Add Group
      </button>
    </>
  )
}

export default AddGroup