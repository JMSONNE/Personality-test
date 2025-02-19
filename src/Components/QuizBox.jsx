import React, { useState } from 'react'
import questions from '../assets/questions.json'

export const QuizBox = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLastQuestion, setIsLastQuestion] = useState(false);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => {
            if (prevIndex < questions.length - 1) {
                return prevIndex + 1;
            } else {
                setIsLastQuestion(true);
                return prevIndex; // Return the same index if it's the last question
            }
        });
    };

    const currentQuestion = questions[currentQuestionIndex];

    if (isLastQuestion) {
        return (
            <div className='quiz-box'>
                <h1 className="question">Almost Ready...</h1>
                <hr />
                <button>
                    Submit
                </button>
            </div>
        );
    } else {
        return (
            <div className='quiz-box'>
                <div key={currentQuestion.id}>
                    <h1 className="question">{currentQuestion.question}</h1>
                    <hr />
                    {currentQuestion.answers.map((answer, index) => (
                        <button key={index} onClick={handleNextQuestion}>
                            {answer.text}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}
