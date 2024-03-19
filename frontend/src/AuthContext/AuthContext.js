import { useQuery } from '@tanstack/react-query';
import {createContext , useEffect, useState , useContext} from 'react';
import { checkUserAuth } from '../api/users/userApi';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated , setIsAuthenticated] = useState(false);

    const {isError , data , isLoading , isSuccess} = useQuery({queryFn:checkUserAuth , queryKey:['checkAuth']} );

    useEffect(() => {
        if (isSuccess) {
            setIsAuthenticated(data);
        }
        
    } , [data , isSuccess])

    const login = () => {
        setIsAuthenticated(true);
    }
    const logout = () => {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated , isError , isLoading , isSuccess , data , login , logout}}>
            {children}
        </AuthContext.Provider>
    )
    
}

export const useAuth = () => {
    return useContext(AuthContext);
}