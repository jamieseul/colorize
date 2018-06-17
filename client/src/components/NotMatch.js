import React from 'react';
import {Redirect} from 'react-router-dom';

const NoTMatch = () => {
    return (
        <div>
            <Redirect to = "/" />
        </div>
    );
};

export default NoTMatch;