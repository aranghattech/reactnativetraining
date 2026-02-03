import { createContext } from 'react';
import {User} from "../types/user";

export type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({user: null, setUser: () => {}});

export { UserContext };