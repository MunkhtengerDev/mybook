    import React, { useState, useEffect } from 'react'
    import { useNavigate, useLocation } from 'react-router-dom'


    const Spinner = () => {
        const [count, setCount] = useState(10);
        const navigate = useNavigate();
        const location = useLocation();

        useEffect(() => {
            const interval = setInterval(() =>{
                setCount((prevValue) => --prevValue);
            }, 1000)

            count === 0 && navigate(`${navigate(-1)}`, { state: location.pathname });

            return () => clearInterval(interval);
        }, [count, navigate, location]);

        return (
            <div className='container'>
                <h2>
                    We will redirect you in {count} seconds.
                </h2>
            </div>
        )
    }

    export default Spinner
