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
    usageData: any
    setUsageData: (usageData: any) => void
    fetchUsageData: (userId: string) => Promise<any>
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

export const UserProvier = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [isLoading, setIsloading] = useState(true)
    const [usageData, setUsageData] = useState<any>(null)

    const fetchUserData = async () => {
        setIsloading(true)
        try {
            const res = await api.post('auth/me');
            // console.log(res.data)
            setUserData(res.data);
        }
        catch (err) {
            console.log(err)
            setUserData(null)
        } finally {
            setIsloading(false)
        }
    }
    useLayoutEffect(() => {
        ; (
            async function () {
                setInterval(() => {
                    fetchUserData()
                }, 300_000);
            }
        )()
    }, [usageData, setUserData]);

    const fetchUsageData = async (userId: string): Promise<any> => {
        try {
            const res = await api.post(`usage/${userId}`);
            console.log(res.data)
            setUsageData(res.data);
            return res.data;
        }
        catch (err) {
            console.log(err)
            return null
        }
    }

    return (
        <UserContext.Provider value={{ userData, isLoading, setUserData, usageData, fetchUsageData, setUsageData, setIsloading }}>
            {children}
        </UserContext.Provider>
    )
}

