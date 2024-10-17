import { TaskType, GroupType, PersonType } from "../App";

export const UseLocalStorage = (keyTasks: string, keyGroups: string, keyPersons: string) => {
    const setItem = (tasks: TaskType[] | null = null, groups: GroupType[] | null = null, person: PersonType[] | null = null) => {
        try {
            if (tasks !== null) {
                window.localStorage.setItem(keyTasks, JSON.stringify(tasks));
            }
            if (groups !== null) {
                window.localStorage.setItem(keyGroups, JSON.stringify(groups));
            }
            if (person !== null) {
                window.localStorage.setItem(keyPersons, JSON.stringify(person));
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const getItem = (): [TaskType[], GroupType[], PersonType[]] | null => {
        try {
            const tasks = window.localStorage.getItem(keyTasks);
            const groups = window.localStorage.getItem(keyGroups);
            const person = window.localStorage.getItem(keyPersons);

            const parsedTasks: TaskType[] = tasks ? JSON.parse(tasks) : [];
            const parsedGroups: GroupType[] = groups ? JSON.parse(groups) : [];
            const parsedPersons: PersonType[] = person ? JSON.parse(person) : [];


            if (parsedPersons.length === 0) {
                resetPersons();
            }
            if (parsedGroups.length === 0) {
                resetTasks();
            } 
            if (parsedGroups.length === 0) {
                resetGroups();
                return null
            } else {      
                    return [parsedTasks, parsedGroups, parsedPersons];
                }
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    const resetPersons = () => {
        try {
            if (window.localStorage.getItem(keyPersons)) {
                window.localStorage.removeItem(keyPersons);
            }
        } catch (error) {
            console.log(error);
            return null;
        }

    }
    const resetTasks = () => {
        try {
            if (window.localStorage.getItem(keyTasks)) {
                window.localStorage.removeItem(keyTasks);
            }
        } catch (error) {
            console.log(error);
            return null;
        }

    }
    const resetGroups = () => {
        try {
            if (window.localStorage.getItem(keyGroups)) {
                window.localStorage.removeItem(keyGroups);
            }
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    return { setItem, getItem, resetTasks, resetGroups, resetPersons }
};