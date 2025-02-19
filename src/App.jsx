import { useState } from 'react'
import { QuizBox } from './Components/QuizBox'

function App() {
  const [count, setCount] = useState(0)

  console.log('app rendered')

  return (
    <>
      <div>
        <h1>Hello</h1>
      </div>
    </>
  )
}

export default App
