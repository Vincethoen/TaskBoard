import { useContext, useState, useEffect } from 'react';
import Select, { MultiValue, components } from 'react-select';
import { TaskFunctionsType, TaskFunctionsContext } from '../../../App';
import { PersonType, PersonContext } from '../../../App';
import '../../../style.css';

const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: 'var(--secondary-color)',
        borderColor: state.isFocused ? 'var(--highlight-color)' : 'var(--tertiary-color)',
        borderWidth: '2px',
        borderStyle: 'solid',
        boxShadow: 'none',
        padding: '0px',
        borderRadius: '0px',
        fontFamily: 'F77MinecraftRegular',
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: 'var(--tertiary-color)',
        fontFamily: 'F77MinecraftRegular',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        color: 'var(--primary-text-color)',
        fontFamily: 'F77MinecraftRegular',
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: 'var(--secondary-color)',
        borderColor: 'var(--tertiary-color)',
        borderRadius: '0px',
        fontFamily: 'F77MinecraftRegular',
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? 'var(--highlight-color)'
            : state.isFocused
                ? 'var(--tertiary-color)'
                : 'var(--secondary-color)',
        color: state.isSelected
            ? 'var(--secondary-text-color)'
            : 'var(--primary-text-color)',
        cursor: 'pointer',
        borderRadius: '0px',
        fontFamily: 'F77MinecraftRegular',
        ':hover': {
            color: 'var(--highlight-color)',
        },
    }),
    multiValue: (provided: any) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--tertiary-color)',
        borderRadius: '0px',
    }),
    multiValueLabel: (provided: any) => ({
        ...provided,
        color: 'var(--primary-text-color)',
        borderRadius: '0px',
        paddingLeft: 4,
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        color: 'var(--primary-text-color)',
        cursor: 'pointer',
        ':hover': {
            color: 'var(--secondary-text-color)',
        },
    }),
    indicatorSeparator: (provided: any) => ({
        ...provided,
        backgroundColor: 'var(--tertiary-color)',
        width: '2px',
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        padding: '4px',
    }),
};

const CustomOption = (props: any) => {
    return (
        <components.Option {...props}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={props.data.icon}
                    alt={props.data.label}
                    style={{ width: 24, height: 24, marginRight: 8 }} 
                />
                <span>{props.data.value}</span>
            </div>
        </components.Option>
    );
};

const CustomSingleValue = (props: any) => {
    return (
        <components.SingleValue {...props}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={props.data.icon}
                    alt={props.data.label}
                    style={{ width: 24, height: 24, marginRight: 8 }} 
                />
                <span>{props.data.value}</span>
            </div>
        </components.SingleValue>
    );
};

const CustomMultiValue = (props: any) => {
    return (
        <components.MultiValue {...props}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={props.data.icon}
                    alt={props.data.label}
                    style={{ width: 24, height: 24, marginRight: 8 }} 
                />
                <components.MultiValueLabel {...props} />
            </div>
        </components.MultiValue>
    );
};

const ItemAssignement = ({ id }: { id: string }) => {
    const functionContext = useContext<TaskFunctionsType | undefined>(TaskFunctionsContext);
    const personContext = useContext<PersonType[] | undefined>(PersonContext);
    const [selectedOptions, setSelectedOptions] = useState<{ value: string, label: string, icon: string }[]>([]);

    const [options, setOptions] = useState<{ value: string; label: string; icon: string; }[]>([]);

    useEffect(() => {
        if (options.length < 1) {
            populatePersons();
        }
        if (functionContext) {
            const assignedPeople = functionContext.getAssignedPeople(id);
            if (assignedPeople === null) {
                return;
            }
            if (Array.isArray(assignedPeople)) {
                setSelectedOptions(assignedPeople);
            }
        }
    }, [options, functionContext, id]);

    const populatePersons = () => {
        if (personContext) {
            const newOptions = personContext.map((person) => ({
                value: `${person.firstName} ${person.lastName}`,
                label: `${person.firstName} ${person.lastName}`,
                icon: person.profilePath
            }));
            setOptions(newOptions);
        }
    }

    const handleAssignment = (newValue: MultiValue<{ value: string, label: string, icon: string }>) => {
        const selectedValues = newValue || undefined;

        setSelectedOptions(selectedValues as { value: string, label: string, icon: string }[]);

        if (functionContext && selectedValues.length >= 0) {
            functionContext.assignAssignment(id, selectedValues as { value: string, label: string, icon: string }[]);
        }
    };

    return (
        <>
            <Select
                id={id}
                isMulti
                options={options}
                value={selectedOptions}
                onChange={handleAssignment}
                placeholder='Assign.. '
                styles={customStyles}
                components={{ 
                    Option: CustomOption,
                    SingleValue: CustomSingleValue,
                    MultiValue: CustomMultiValue
                }}
            />
        </>
    );
}

export default ItemAssignement;
