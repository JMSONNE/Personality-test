import React, { useState, useEffect } from 'react';
import questions from '../assets/questions.json';
import types from '../assets/types.json';

export const QuizBox = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [typeCount, setTypeCount] = useState(new Map([
        ["I", 0], ["E", 0],
        ["S", 0], ["N", 0],
        ["T", 0], ["F", 0],
        ["J", 0], ["P", 0]
    ]));
    const [isDone, setIsDone] = useState(false);
    const [personalityType, setPersonalityType] = useState('');
    const [personalityTraits, setPersonalityTraits] = useState(null);

    // Handles displaying current question and moving on to new question after answer submission
    const handleQuestions = () => {
        setCurrentQuestion((prevQuestion) => {
            if (prevQuestion < questions.length - 1) {
                return prevQuestion + 1;
            } else {
                setIsDone(true);
                return prevQuestion;
            }
        });
    };

    // Handles incrementing type values based on the selected answer
    const handleAnswers = (answer) => {
        setTypeCount((prevTypeCount) => {
            const newTypeCount = new Map(prevTypeCount);
            const currentCount = newTypeCount.get(answer.type) || 0;
            newTypeCount.set(answer.type, currentCount + 1);
            return newTypeCount;
        });
        handleQuestions();
    };

    // Handles determining 4 letter score
    const handleScore = () => {
        const I = typeCount.get("I") || 0;
        const E = typeCount.get("E") || 0;
        const S = typeCount.get("S") || 0;
        const N = typeCount.get("N") || 0;
        const T = typeCount.get("T") || 0;
        const F = typeCount.get("F") || 0;
        const J = typeCount.get("J") || 0;
        const P = typeCount.get("P") || 0;

        // Example logic to determine the personality type
        const IE = I > E ? "I" : "E";
        const SN = S > N ? "S" : "N";
        const TF = T > F ? "T" : "F";
        const JP = J > P ? "J" : "P";

        const determinedPersonalityType = `${IE}${SN}${TF}${JP}`;

        console.log('Determined Personality Type:', determinedPersonalityType);

        setPersonalityType(determinedPersonalityType);
    };

    // Calculates personality traits
    const handleGetTraits = () => {
        const matchingType = types.find(type => type.code === personalityType);

        if (matchingType) {
            setPersonalityTraits(matchingType);
            console.log('Personality Traits:', matchingType);
        } else {
            console.log('No matching personality type found.');
        }
    };

    // Use useEffect to call handleGetTraits when personalityType changes
    useEffect(() => {
        if (personalityType) {
            handleGetTraits();
        }
    }, [personalityType]);

    // Logs current index of question for dev purposes
    console.log(`Current question #: ${currentQuestion + 1}`);
    console.log('Current type count:', Object.fromEntries(typeCount));
    console.log(`Personality traits: ${personalityTraits}`);

    if (isDone && !personalityType) {
        handleScore();
    }

    if (isDone && personalityType) {
        return (
            <div className="container">
                <div className="quiz-box">
                    <div className="question">
                        <h1 className='title'>You are:</h1>
                        <hr />
                        <div className="result-box">
                            <p className='value code'>{personalityType}</p>
                            {personalityTraits && (
                                <>
                                    <h1 className="value">Name:</h1>
                                    <p className='value'>{personalityTraits.type}</p>
                                    <h1 className="value">Key traits:</h1>
                                    <p className='value'>{personalityTraits.traits}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="quiz-box">
                <div className="question">
                    <h1>{questions[currentQuestion].question}</h1>
                    <hr />
                </div>
                <div className="answer-box">
                    {questions[currentQuestion].answers.map((answer, index) => (
                        <div className='button' key={index} onClick={() => handleAnswers(answer)}>
                            {answer.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

