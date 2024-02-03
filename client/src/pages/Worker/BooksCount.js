import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as api from '../../api/index';

const BooksCount = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        api.getAllBooks()
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div>
            {Array.isArray(data) && (
                <div>
                    Total Books: {data.length}
                </div>
            )}
        </div>
    )
}

export default BooksCount
