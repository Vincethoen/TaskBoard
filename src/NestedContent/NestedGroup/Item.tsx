import ItemInput from './NestedItem/ItemInput';
import ItemIcon from './NestedItem/ItemIcon';
import ItemSubject from './NestedItem/ItemSubject';
import ItemStatus from './NestedItem/ItemStatus';
import ItemAssignement from './NestedItem/ItemAssignement';

const Item = ({ id }: { id: string; }) => {
  return (
    <li>
      <ItemInput
        id={id}
      />
      <div className='item-container'>
        <ItemIcon
          id={id}
        />
        <ItemSubject
          id={id}
        />
        <ItemStatus
          id={id}
        />
      </div>
      <div className='item-assignment'>
        <ItemAssignement id={id} />
      </div>
    </li>
  )
}

export default Item