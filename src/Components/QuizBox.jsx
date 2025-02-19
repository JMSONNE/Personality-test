import React, { useState } from 'react';
import questions from '../assets/questions.json';

export const QuizBox = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);

    // Handles displaying current question and moving on to new question after answer submission
    const handleQuestions = () => {
        setCurrentQuestion((prevQuestion) => {
            if (prevQuestion < questions.length) {
                return prevQuestion + 1
            }


        })
    }

    // logs current index of question for dev purposes
    console.log(currentQuestion)

    if (currentQuestion === 20) {
        return (
            <div className="quiz-box">
                <div className="question">
                    <h1>All answers submitted</h1>
                    <hr />
                    <button >
                        Submit
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="quiz-box">
                <div className="question">
                    <h1>{questions[currentQuestion].question}</h1>
                    <hr />
                    {questions[currentQuestion].answers.map((answer, index) => (
                        <button key={index} onClick={handleQuestions}>
                            {answer.text}
                        </button>
                    )

                    )}
                </div>
            </div>
        </>
    )
};

