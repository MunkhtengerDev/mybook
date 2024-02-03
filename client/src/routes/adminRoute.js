import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from "../context/auth";
import Spinner from '../components/Spinner'
import * as api from '../api/index';



const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
console.log("auth =============> ",auth);

    const authCheck = async () => {
                const res = await api.getAdmin();

        console.log('res =======================> ', res);

        if (res.data.ok) {
            setOk(true);
        } else {
            setOk(false);
        }

    }

    useEffect(() => {
        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path='/' />
}

export default AdminRoute;