import { useUserContext } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {

    const { userData, isLoading } = useUserContext()
    if (isLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                loading...
            </div>
        )
    }

    if (userData !== null && userData?.auth === true) {
        return <Navigate to={'/'} replace />
    }

    return (
        <main className='w-screen h-screen items-center justify-center flex '>
            <Outlet />
        </main>
    );
};

export default AuthLayout;
