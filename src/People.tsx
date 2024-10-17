import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useContext } from 'react';
import { PersonContext, PersonType } from './App';
import { PersonFunctionsContext, PersonFunctionsType } from './App';
import add from './assets/add.svg'
import Person from './NestedContent/NestedGroup/NestedItem/Person'

const People = () => {
  const [parent] = useAutoAnimate();
  const personContext = useContext<PersonType[] | undefined>(PersonContext)
  const personFunctionsContext = useContext<PersonFunctionsType | undefined>(PersonFunctionsContext)

  const handleAddPerson = () => {
    if (personFunctionsContext) {
      personFunctionsContext.addPerson()
    }
  }

  return (
    <div className='people'>
      <ul ref={parent}>
        {personContext?.map(person => (
          <Person
            key={person.id}
            id={person.id}
          />
        ))}
      </ul>
      <button className='add-person' onClick={() => handleAddPerson()}>
        <p><img src={add} alt="add-button" /></p>
      </button>
    </div>
  )
}

export default People