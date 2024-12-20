import React, { useState, useEffect } from 'react';

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizOver, setQuizOver] = useState(false);
    const [email, setEmail] = useState('');

    
    useEffect(() => {
        // Fetch quiz questions from backend
        fetch('http://localhost:5000/quiz')
            .then((res) => res.json())
            .then((data) => {
                console.log(data); // Check if data is being received
                setQuestions(data); // Update the state with fetched data
            })
            .catch((err) => console.error('Error fetching quiz:', err));
    }, []);
    
    const handleAnswer = (selected) => {
        if (selected === questions[currentIndex].answer) {
            setScore(score + 1);
        }
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setQuizOver(true);
        }
    };
    const handleEmailSubmit = () => {
        if (!email) {
            alert('Please enter your email.');
            return;
        }

        fetch('http://localhost:5000/send-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, score }),
        })
            .then((res) => res.json())
            .then((data) => alert(data.message))
            .catch((err) => console.error('Error sending score:', err));
    };
    return (
        <div>
            {!quizOver ? (
                questions.length > 0 && (
                    <div>
                        <h3>{questions[currentIndex].question}</h3>
                        {questions[currentIndex].options.map((option, index) => (
                            <button key={index} onClick={() => handleAnswer(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                )
            ) : (
                <div>
                    <h2>Quiz Over!</h2>
                    <p>Your Score: {score}</p>
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button onClick={handleEmailSubmit}>Send Result to Email</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
    