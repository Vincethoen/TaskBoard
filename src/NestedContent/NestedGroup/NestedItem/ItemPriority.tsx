import { useState, useContext } from 'react'
import P1 from './../../../assets/P1.svg';
import P2 from './../../../assets/P2.svg';
import P3 from './../../../assets/P3.svg';
import P4 from './../../../assets/P4.svg';
import P5 from './../../../assets/P5.svg';
import { TaskFunctionsContext, TaskFunctionsType } from '../../../App';

const ItemPriority = ({ id }: { id: string; }) => {    
    const [priority, setPriority] = useState<number>(1);
    const [image, setImage] = useState<string>(P1);
    const taskFunctionsContext = useContext<TaskFunctionsType | undefined>(TaskFunctionsContext);

    const handleSetPriority = () => {
        if (!taskFunctionsContext) {
            return;
        }
        switch (priority) {
            case 1:
                setPriority(2);
                setImage(P2);
                taskFunctionsContext.setPriority(id, 2)
                break;
            case 2:
                setPriority(3);
                setImage(P3);
                taskFunctionsContext.setPriority(id, 3)
                break;
            case 3:
                setPriority(4);
                setImage(P4);
                taskFunctionsContext.setPriority(id, 4)
                break;
            case 4:
                setPriority(5);
                setImage(P5);
                taskFunctionsContext.setPriority(id, 5)
                break;
            case 5:
                setPriority(1);
                setImage(P1);
                taskFunctionsContext.setPriority(id, 1)
                break;

            default:
                setPriority(1);
                setImage(P1);
                taskFunctionsContext.setPriority(id, 1)
                break;
        }        
    }

    return (
        <button onClick={() => handleSetPriority()}>
            <img src={image} alt="priority" className='priority-image' />
        </button>
    )
}

export default ItemPriority;
