import React from 'react';
import mountain from '../images/mountains.jpeg';

export default function SimpleResource(data: any) {
    const { title, author, exerpt, resolved_url, time_length } = data.resource

    const handleOnClick = () => {
        window.open(resolved_url, "_blank");
    }

    return (
        <div onClick={() => {handleOnClick()}} className="max-w-sm rounded overflow-hidden shadow-lg float-left m-3">
            <img className="w-full h-48 object-cover" src={mountain} alt="Sunset in the mountains"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title} - {author}</div>
                <p className="text-gray-700 text-base">{exerpt}</p>
            </div>
            <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{Math.floor(time_length/60)}:{("0" + (time_length % 60)).slice(-2)}  minutes</span>
            </div>
        </div>
    );
}