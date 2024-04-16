import React from 'react';

const MainPage = () => {
    const sayHi = () => {
        alert('Hi');
    }

    return (
        <button onClick={sayHi}>
            Click me
        </button>
    );
}

export default MainPage;