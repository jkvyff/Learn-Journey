import * as React from 'react'
import { Routes } from './Routes';
import { useState, useEffect } from 'react';
import { setAccessToken } from './accessToken';

interface Props { }

export const App: React.FC<Props> = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:4000/refresh_token", {
            method: 'POST',
            credentials: 'include'
        }).then(async res => {
            const { accessToken } = await res.json();
            setAccessToken(accessToken);
            console.log(accessToken)
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return <Routes />;
}