import React from 'react';

function jokeContent(props) {
    return (
        <div>
            <p>{props.type}</p>
            <p>{props.joke}</p>
            <p>{props.setup}</p>
        </div>
    );
}

export default jokeContent;