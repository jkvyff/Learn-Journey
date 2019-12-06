import * as React from 'react'
import { useResourcesQuery } from '../generated/graphql';
import SimpleResource from '../components/simpleResource';

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
            <div>{data.resources.map((resource => {
                    return (
                        <div key={resource.id}>
                            <SimpleResource resource={resource}/>
                        </div>
                    );
                }))}</div>
        </div>
    );
}