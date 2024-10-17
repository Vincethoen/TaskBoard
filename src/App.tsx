import { useState, createContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UseLocalStorage } from "./CustomHooks/UseLocalStorage";
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import People from "./People";
import './style.css';

export type GroupType = {
  id: string;
  name: string;
  edit: boolean;
  hidden: boolean;
}

export type TaskType = {
  id: string;
  task: string;
  edit: boolean;
  groupIndex: number;
  hidden: boolean;
  icon: string;
  subject: string;
  priority: number;
  assignment: { value: string, label: string }[];
}

export type PersonType = {
  id: string;
  profilePath: string;
  firstName: string;
  lastName: string;
  edit: boolean;
}

export type GroupFunctionsType = {
  addGroup: () => void;
  editGroup: (text: string, id: string) => void;
  removeGroup: (id: string) => void;
};

export type TaskFunctionsType = {
  addTask: () => void;
  editTask: (text: string, id: string) => void;
  editSubject: (text: string, id: string) => void;
  removeTask: (id: string) => void;
  searchTask: (searchTerm: string) => void;
  incrementTask: (task: TaskType) => void;
  decrementTask: (task: TaskType) => void;
  newRandomIcon: (id: string) => void;
  setPriority: (id: string, priorityLevel: number) => void;
  assignAssignment: (id: string, assignmentValues: { value: string, label: string }[] | undefined) => void;
  getAssignedPeople: (id: string) => void;
};

export type PersonFunctionsType = {
  addPerson: () => void;
  editFirstName: (id: string, FirstName: string) => void;
  editLastName: (id: string, lastName: string) => void;
  removePerson: (id: string) => void;
  editProfileIcon: (id: string, path: string) => void;
  getRandomProfile: () => void;
  getRandomNickname: () => void;
  getRandomFirstName: () => void;
};

export const ThemeContext = createContext<{
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}>({ darkMode: false, setDarkMode: () => { } });

export const GroupFunctionsContext = createContext<GroupFunctionsType | undefined>(undefined);
export const TaskFunctionsContext = createContext<TaskFunctionsType | undefined>(undefined);
export const PersonFunctionsContext = createContext<PersonFunctionsType | undefined>(undefined);

export const GroupContext = createContext<GroupType[] | undefined>([]);
export const TaskContext = createContext<TaskType[] | undefined>([]);
export const PersonContext = createContext<PersonType[] | undefined>([]);

function App() {
  const [count, setCount] = useState<number>(1);
  const [group, setGroup] = useState<GroupType[]>([]);
  const [task, setTask] = useState<TaskType[]>([]);
  const [person, setPerson] = useState<PersonType[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const { getItem, setItem } = UseLocalStorage('Tasks', 'Groups', 'Persons');

  useEffect(() => {
    const localData: [TaskType[], GroupType[], PersonType[]] | null = getItem();
    if (localData) {
      if (localData[0].length > 0) {
        setTask(localData[0]);
      }
      if (localData[1].length > 0) {
        setGroup(localData[1]);
      }
      if (localData[2].length > 0) {
        setPerson(localData[2]);
      }
    }
  }, []);

  /* Extra Person functions */
  const getRandomProfile = () => {
    const randomIndex = Math.floor(Math.random() * 17) + 1;
    const newPath = (`../../../../../public/r${String(randomIndex).padStart(2, '0')}.svg`);
    setPerson
    return newPath;
  }
  const getRandomNickname = () => {
    const nicknames = [
      'the Destroyer',
      'the All Mighty',
      'the Conqueror',
      'the Brave',
      'the Fearless',
      'the Invincible',
      'the Swift',
      'the Bold',
      'the Great',
      'the Wise',
      'the Just',
      'the Fierce',
      'the Merciless',
      'the Magnificent',
      'the Unstoppable',
      'the Valiant',
      'the Ruthless',
      'the Mighty',
      'the Defender',
      'the Avenger'
    ];
    return `${nicknames[Math.floor(Math.random() * nicknames.length)]}`;
  }
  const getRandomFirstName = () => {
    const firstNames = [
      'Liam', 'Noah', 'James', 'Oliver', 'Emma', 'Charlotte', 'Sofie', 'Eva',
      'Lucas', 'Mason', 'Ethan', 'Henry', 'Vince', 'Julia', 'Kelly', 'Tess',
      'Lucas', 'Finn', 'Daan', 'Bram', 'Susan', 'Sanne', 'Lotte', 'Elisa',
      'Jack', 'Harry', 'Miranda', 'George', 'John', 'Sophia', 'Mia', 'Grace',
      'Levi', 'Sam', 'Jasper', 'Max', 'Isabella', 'Chloe', 'Olivia', 'Zoe',
      'Ruben', 'Sven'
    ];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]}`;
  }


  /* Person functions */

  const addPerson = () => {
    const randomNickname = getRandomNickname();
    const randomFirstName = getRandomFirstName();
    const newPerson = {
      id: crypto.randomUUID(),
      profilePath: getRandomProfile(),
      firstName: randomFirstName,
      lastName: randomNickname,
      edit: false,
    };
    if (newPerson.profilePath) {
      setPerson((prevPerson) => [...prevPerson, newPerson]);
    }
  }

  const removePerson = (id: string) => {
    setPerson(prevPerson => {
      const newPersons = prevPerson.filter(person => person.id !== id);
      setItem(task, group, newPersons);
      return newPersons;
    });
  }

  const editFirstName = (id: string, firstName: string) => {
    setPerson(prevPerson => {
      const updatedPersons = prevPerson.map(person =>
        person.id === id ? { ...person, firstName: firstName } : person
      );
      setItem(task, group, updatedPersons);
      return updatedPersons;
    });
  }

  const editLastName = (id: string, lastName: string) => {
    setPerson(prevPerson => {
      const updatedPersons = prevPerson.map(person =>
        person.id === id ? { ...person, lastName: lastName } : person
      );
      setItem(task, group, updatedPersons);
      return updatedPersons;
    });
  }

  const editProfileIcon = (id: string, path: string) => {
    setPerson(prevPerson => {
      const updatedPersons = prevPerson.map(person =>
        person.id === id ? { ...person, profilePath: path } : person
      );
      setItem(task, group, updatedPersons);
      return updatedPersons;
    });
  }


  /* Extra Group functions */

  function getRandomName(name: string = '') {
    if (name === '') {
      const adjectives = ['Big', 'Tiny', 'Great', 'Holy', 'Unholy', 'Awesome', 'Fantastic', 'Sad', 'Whimsical', 'Gigantic', 'Jolly', 'Silly', 'Fancy', 'Cheerful', 'Glorious', 'Majestic'];
      const nouns = ['Shopping', 'Groceries', 'Tasks', 'Bucket', 'Wishes', 'Checks', 'Agenda', 'Plan', 'Schedule', 'Inventory', 'Menu', 'Recipes', 'Books', 'Goals', 'Dreams'];

      const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

      name = `${randomAdjective} ${randomNoun}`;
    }
    return name;
  }

  /* Group functions  */

  const addGroup = () => {
    const randomName = getRandomName();
    const newGroup = {
      id: crypto.randomUUID(),
      name: randomName,
      edit: false,
      hidden: false,
    };
    setGroup((prevGroup) => [...prevGroup, newGroup]);
    setItem(sortTasks(task), group, person);
  }

  const editGroup = (text: string, id: string) => {
    setGroup(prevGroup => {
      const newGroups = prevGroup.map(group => group.id === id
        ? { ...group, name: text } : group
      );
      setItem(sortTasks(task), newGroups, person);
      return newGroups;
    });
  };

  const removeGroup = (id: string) => {
    const index = group.findIndex(grp => grp.id === id);

    setGroup(prevGroups => {
      const newGroups = prevGroups.filter(group => group.id !== id);

      const newTasks = (prevTasks: TaskType[]) => {
        const filteredTasks = prevTasks.filter(task => task.groupIndex !== index);
        const updatedTasks = filteredTasks.map(task =>
          task.groupIndex > index ? { ...task, groupIndex: task.groupIndex - 1 } : task
        );
        return updatedTasks;
      };

      setTask(prevTasks => {
        const updatedTasks = newTasks(prevTasks);
        setItem(sortTasks(updatedTasks), newGroups, person);
        return updatedTasks;
      });

      return newGroups;
    });
  };

  /* Extra Task functions  */

  const getAssignedPeople = (id: string) => {
    const currentTask = task.find(task => task.id === id);
    if (currentTask) {
      return currentTask.assignment;
    }
    return [null];
  }

  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * 20) + 1;
    return `../../../../../public/icons/${String(randomIndex).padStart(2, '0')}.png`;
  }

  const newRandomIcon = (id: string) => {
    const newIcon: string = getRandomIcon();
    setTask(prevTask => {
      const newTasks = prevTask.map(task => task.id === id
        ? { ...task, icon: newIcon } : task
      );
      setItem(sortTasks(newTasks), group, person);
      return newTasks;
    })
    return newIcon;
  }

  function getRandomTask() {
    const tasks: string[] = [
      'Teach a fish to ride a bicycle.',
      'Paint the sky green.',
      'Convince a rock to sing.',
      'Count the stars during the day.',
      'Train a cat to do taxes.',
      'Measure the length of a rainbow.',
      'Bathe a squirrel in a teacup.',
      'Host a chess tournament for chickens.',
      'Teach a snail to breakdance.',
      'Convince a cloud to write a novel.',
      'Get a sunburn from the moon.',
      'Teach a tree to do yoga.',
      'Train a hamster to conduct an orchestra.',
      'Find the WiFi password for Atlantis.',
      'Convince a shadow to play hide and seek.',
      'Organize a marathon for turtles.',
      'Build a skyscraper out of marshmallows.',
      'Have a staring contest with the sun.'
    ];
    const randomIndex: number = Math.floor(Math.random() * tasks.length);

    return tasks[randomIndex];
  }

  const incrementTask = (currentTask: TaskType) => {
    if (group.length === 0) {
      console.error('Group array is empty or undefined');
      return;
    }

    const newIndex = (currentTask.groupIndex + 1) % group.length;

    setTask(prevTask => {
      const newTasks = prevTask.map(task =>
        task.id === currentTask.id ? { ...task, groupIndex: newIndex } : task
      );
      setItem(sortTasks(newTasks), group, person);
      return newTasks;
    });
  };

  const decrementTask = (currentTask: TaskType) => {
    if (group.length === 0) {
      console.error('Group array is empty or undefined');
      return;
    }

    const newIndex = (currentTask.groupIndex - 1 + group.length) % group.length;

    setTask(prevTask => {
      const newTasks = prevTask.map(task =>
        task.id === currentTask.id ? { ...task, groupIndex: newIndex } : task
      );
      setItem(sortTasks(newTasks), group, person);
      return newTasks;
    });
  };

  const setPriority = (id: string, priorityLevel: number) => {
    setTask(prevTask => {
      const newTasks = prevTask.map(task => task.id === id
        ? { ...task, priority: priorityLevel } : task);
      setItem(sortTasks(newTasks), group, person);
      return newTasks;
    });
  }

  const sortTasks = (tasksToSort: TaskType[]) => {
    return tasksToSort.sort((b, a) => a.priority - b.priority);
  };

  const assignAssignment = (id: string, assignmentValues: { value: string, label: string }[] | undefined) => {
    if (!assignmentValues) {
      return undefined;
    }
    setTask(prevTask => {
      const newTask = prevTask.map(task => task.id === id
        ? { ...task, assignment: assignmentValues } : task
      );
      setItem(sortTasks(newTask), group, person);

      return newTask;
    })
  };

  /* Task functions  */

  const addTask = () => {
    if (group.length === 0) {
      addGroup();
    }
    const randomTask = `#${count} ${getRandomTask()}`;
    const newTask = {
      id: crypto.randomUUID(),
      edit: false,
      task: randomTask,
      groupIndex: 0,
      hidden: false,
      icon: getRandomIcon(),
      subject: getRandomName(),
      priority: 1,
      assignment: [],
    };

    setTask((prevTasks) => [...prevTasks, newTask]);
    setCount((prevCount) => prevCount + 1);
    setItem(sortTasks(task), group, person);
  };

  const editTask = (text: string, id: string) => {
    setTask(prevTask => {
      const newTasks = prevTask.map(task => task.id === id
        ? { ...task, task: text } : task
      );
      setItem(sortTasks(task), group, person);
      return newTasks;
    });
  };

  const editSubject = (text: string, id: string) => {
    setTask(prevTask => {
      const newTasks = prevTask.map(task => task.id === id
        ? { ...task, subject: text } : task
      );
      setItem(sortTasks(task), group, person);
      return newTasks;
    });
  };

  const removeTask = (id: string) => {
    setTask(prevTask => {
      const newTasks = prevTask.filter(task => task.id !== id);
      setItem(sortTasks(task), group, person);
      return newTasks
    });
  };

  const searchTask = (searchTerm: string) => {
    if (searchTerm === '') {
      const allTasks = task.map(tsk => ({ ...tsk, hidden: false }));
      setTask(allTasks);
    } else {
      const filteredTasks = task.map(tsk => {
        const isVisible =
          tsk.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tsk.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tsk.assignment.some(assigned => assigned.value.includes(searchTerm.toLowerCase()));

        return { ...tsk, hidden: !isVisible };
      });
      setTask(filteredTasks);
    }
  };


  const groupFunctions: GroupFunctionsType = {
    addGroup,
    editGroup,
    removeGroup,
  };

  const taskFunctions: TaskFunctionsType = {
    addTask,
    editTask,
    editSubject,
    removeTask,
    searchTask,
    incrementTask,
    decrementTask,
    newRandomIcon,
    setPriority,
    assignAssignment,
    getAssignedPeople,
  };

  const personFunctions: PersonFunctionsType = {
    addPerson,
    editFirstName,
    editLastName,
    removePerson,
    editProfileIcon,
    getRandomProfile,
    getRandomNickname,
    getRandomFirstName,
  };

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <GroupFunctionsContext.Provider value={groupFunctions}>
          <TaskFunctionsContext.Provider value={taskFunctions}>
            <PersonFunctionsContext.Provider value={personFunctions}>
              <div className="body" data-theme={darkMode ? 'dark' : 'light'}>
                <Header />
                <GroupContext.Provider
                  value={group}>
                  <TaskContext.Provider
                    value={task}>
                    <PersonContext.Provider
                      value={person}>
                      <div className="content">
                        <Routes>
                          <Route path="/" element={<Content />} />
                          <Route path="/people" element={<People />} />
                        </Routes>
                      </div>
                    </PersonContext.Provider>
                  </TaskContext.Provider>
                </GroupContext.Provider>
                <Footer />
              </div>
            </PersonFunctionsContext.Provider>
          </TaskFunctionsContext.Provider>
        </GroupFunctionsContext.Provider>
      </ThemeContext.Provider>
    </BrowserRouter>
  )
}

export default App
