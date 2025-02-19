import React, { useState } from 'react'
import questions from '../assets/questions.json'

export const QuizBox = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [typeMap, setTypeMap] = useState(new Map([
        ['I', 0],
        ['E', 0],
        ['S', 0],
        ['N', 0],
        ['T', 0],
        ['F', 0],
        ['J', 0],
        ['P', 0]
    ]));

    const handleTypeAnswers = (answer) => {
        setTypeMap((prevTypeMap) => {
            const newTypeMap = new Map(prevTypeMap);
            const currentCount = newTypeMap.get(answer.type) || 0;
            newTypeMap.set(answer.type, currentCount + 1);
            console.log(typeMap)
            return newTypeMap;
        });
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => {
            if (prevIndex < questions.length - 1) {
                return prevIndex + 1;
            } else {
                setIsLastQuestion(true);
                return prevIndex;
            }
        });
    };

    const combo = [];

    const handlePersonalityType = () => {
        let maxCount = 0;
        let personalityType = '';
        typeMap.forEach((count, type) => {
            if (count > maxCount) {
                maxCount = count;
                personalityType = type;
            }
        });
        console.log('Determined Personality Type:', personalityType);
    };

    const currentQuestion = questions[currentQuestionIndex];

    if (isLastQuestion) {
        return (
            <div className='quiz-box'>
                <h1 className="question">Almost Ready...</h1>
                <hr />
                <button onClick={handlePersonalityType}>
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
                        <button key={index} onClick={() => {
                            handleTypeAnswers(answer);
                            handleNextQuestion();
                        }}>
                            {answer.text}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}
