import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import * as api from '../../api/index';
import AllUsers from './AllUsers';

const Dashboard = () => {


    return (
        <div className='mt-20'>
            <AllUsers/>
        </div>
    )
}

export default Dashboard
