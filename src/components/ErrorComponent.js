import React from 'react';

const ErrorComponent = ({message}) => ( 
        <p className="alert alert-danger p-3 my-5 text-center text-uppercase font-weight-bold">
            {message}
        </p>
     );
 
export default ErrorComponent;
