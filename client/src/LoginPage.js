import React, { useState } from 'react';

const LoginPage = ({ onStartQuiz }) => {
    const [name, setName] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setName(value);
        setIsFormValid(value.length > 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onStartQuiz(name); // Pass name to App component
        }
    };

    return (
        <div className="login-container">
            <h2>Welcome to the Quiz!</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={!isFormValid}>
                    Start Quiz
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
