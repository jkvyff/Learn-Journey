import * as React from 'react'
import { useHelloLockQuery } from '../generated/graphql';

interface Props { }

export const HelloLock: React.FC<Props> = () => {
    const { data, loading, error } = useHelloLockQuery();

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        console.log(error)
        return <div>err</div>
    }

    if (!data) {
        return <div>No data available</div>
    }

    return (<div>{data.helloLock}</div>);
}