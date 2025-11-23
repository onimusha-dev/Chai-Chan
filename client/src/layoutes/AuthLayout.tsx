import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <main className='w-screen h-screen items-center justify-center flex '>
            <Outlet />
        </main>
    );
};

export default AuthLayout;
