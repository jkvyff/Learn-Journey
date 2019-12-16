import * as React from 'react'
import { useResourcesQuery } from '../generated/graphql';
import SimpleCard from '../components/simpleCard';

interface Props { }

export const Discover: React.FC<Props> = () => {
    const { data, loading, error } = useResourcesQuery();

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

    return (
        <div>
            <div>Discoveries to be made:</div>
            <div className="flex justify-start flex-wrap ml-32 mr-32">{data.resources.map((resource => {
                return (
                    <div key={resource.id}>
                        <SimpleCard resource={resource}/>
                    </div>
                );
            }))}</div>
        </div>
    );
}