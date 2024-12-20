import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import SignupPage from './SignupPage'; 
import LoginPage from './LoginPage';
import QuizPage from './QuizPage';
import './App.css';
import { useState } from 'react';

function App() {

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [quizStarted, setQuizStarted] = useState(false);
    const [loginPageStarted, setLoginPageStarted] = useState(false); 

    const handleSignup = (userEmail) => {
        setEmail(userEmail);       // Store the user's email
        setLoginPageStarted(true);      // Start the quiz after successful signup
    };

    const startQuiz = (name) => {
        setUserName(name);
        setQuizStarted(true);
    };

    return (
        <ErrorBoundary>
        <div className="App">
            <h1>QuizzyPops</h1>
            {!quizStarted ? ( 
             loginPageStarted ? (
                <LoginPage onStartQuiz={startQuiz} />
            ) : (
                <SignupPage onSignup={handleSignup} />
            )
        ) : (
                <QuizPage userName={userName} email={email} />
            )}
        </div>
        </ErrorBoundary>
    );
}

export default App;
