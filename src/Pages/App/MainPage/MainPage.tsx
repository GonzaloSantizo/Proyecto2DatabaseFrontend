import React from 'react';

const MainPage = () => {
    const sayHi = () => {
        alert('Hi');
    }

    return (
        <article>
            <h1>Main Page</h1>
            <p>This is the main page</p>
            
            <button onClick={sayHi}>
            Click me
            </button>
        </article>
    );
}

export default MainPage;