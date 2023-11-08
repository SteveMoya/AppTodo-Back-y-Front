
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function ProtectedRoute(){
    const auth = useAuth()
    /*
    Aqui hago una redireccion si no esta  auntenticado el usuario
    Se puede colocar un componente que invite al usuario a registrarse
    */
    return auth.isAuthenticated ? <Outlet /> : <Navigate to='/' />

}