import api from "@/api/api";
import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from "react";

export interface UserData {
    userId: string
    username: string
    email: string
    auth: boolean
    
}

interface IUser {
    userData: UserData | null
    setUserData: (userData: UserData | null) => void
    isLoading: boolean
    setIsloading: (isLoading: boolean) => void
}

const UserContext = createContext<IUser | null>(null)

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error(
            'useUserContext must be used within UserProvider',
        );
    }

    return context;
}

const fetchUserData = async (): Promise<UserData | null> => {
    try {
        const res = await api.post('auth/me');
        // console.log(res.data)
        return res.data;
    }
    catch (err) {
        console.log(err)
        return null
    }
}


export const UserProvier = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [isLoading, setIsloading] = useState(true)

    useLayoutEffect(() => {
        ;(
            async function () {
                setIsloading(true)
                const user = await fetchUserData()
                setUserData(user)
                setIsloading(false)
            }
        )()

    }, []);

    return (
        <UserContext.Provider value={{ userData, isLoading, setUserData, setIsloading }}>
            {children}
        </UserContext.Provider>
    )
}

