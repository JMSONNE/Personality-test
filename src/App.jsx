import { useState } from 'react'
import { QuizBox } from './Components/QuizBox'

function App() {
  const [count, setCount] = useState(0)

  console.log('app rendered')

  return (
    <>
      <QuizBox />
    </>
  )
}

export default App
