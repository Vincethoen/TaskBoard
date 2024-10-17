import { useState, useContext, useEffect } from 'react';
import Delete from './../../../assets/delete.svg';
import { PersonContext, PersonType } from '../../../App';
import { PersonFunctionsContext, PersonFunctionsType } from '../../../App';

const Person = ({ id }: { id: string; }) => {
    const personContext = useContext<PersonType[] | undefined>(PersonContext);
    const personFunctionsContext = useContext<PersonFunctionsType | undefined>(PersonFunctionsContext);

    // Derive `thisPerson` directly from `personContext` inside the component
    const thisPerson = personContext?.find(p => p.id === id);

    const [editFirstName, setEditFirstName] = useState(false);
    const [editLastName, setEditLastName] = useState(false);
    const [firstName, setFirstName] = useState(thisPerson?.firstName || '');
    const [lastName, setLastName] = useState(thisPerson?.lastName || '');

    useEffect(() => {
        if (thisPerson) {
            setFirstName(thisPerson.firstName);
            setLastName(thisPerson.lastName);
        }
    }, [personContext, thisPerson]);

    if (!personContext || !personFunctionsContext) {
        return null;
    }

    const handleRandomProfile = () => {
        const newProfilePath = personFunctionsContext.getRandomProfile();
        if (thisPerson) {
            personFunctionsContext.editProfileIcon(thisPerson.id, `${newProfilePath}`);
        }
    }

    const handleRemovePerson = () => {
        if (thisPerson) {
            personFunctionsContext.removePerson(thisPerson.id);
        }
    }

    const handleDoubleClickFirstName = () => {
        setEditFirstName(true);
    }

    const handleDoubleClickLastName = () => {
        setEditLastName(true);
    }

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }

    const handleFirstNameBlur = () => {
        if (thisPerson) {
            personFunctionsContext.editFirstName(thisPerson.id, firstName);
            setEditFirstName(false);
        }
    }

    const handleLastNameBlur = () => {
        if (thisPerson) {
            personFunctionsContext.editLastName(thisPerson.id, lastName);
            setEditLastName(false);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, type: 'firstName' | 'lastName') => {
        if (e.key === 'Enter') {
            if (type === 'firstName') {
                handleFirstNameBlur();
            } else {
                handleLastNameBlur();
            }
        }
    }

    if (!thisPerson) {
        return null;
    }

    return (
        <li className='persons'>
            <button className='btn-change-icon' onClick={() => handleRandomProfile()}>
                <img src={thisPerson.profilePath} alt="icon" />
            </button>
            <div className='full-name'>
                {editFirstName ? (
                    <input
                        type='text'
                        value={firstName}
                        onChange={handleFirstNameChange}
                        onBlur={handleFirstNameBlur}
                        onKeyPress={(e) => handleKeyPress(e, 'firstName')}
                        autoFocus
                    />
                ) : (
                    <p className='first-name' onDoubleClick={handleDoubleClickFirstName}>
                        {`${firstName}\u00A0`}
                    </p>
                )}
                {editLastName ? (
                    <input
                        type='text'
                        value={lastName}
                        onChange={handleLastNameChange}
                        onBlur={handleLastNameBlur}
                        onKeyPress={(e) => handleKeyPress(e, 'lastName')}
                        autoFocus
                    />
                ) : (
                    <p className='last-name' onDoubleClick={handleDoubleClickLastName}>
                        {lastName}
                    </p>
                )}
            </div>
            <button className='btn-delete-profile' onClick={() => handleRemovePerson()} >
                <img src={Delete} alt="delete" />
            </button>
        </li>
    )
}

export default Person;
