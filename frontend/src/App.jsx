import { useState } from 'react';
import Header from './components/Header.jsx';
import StarterPage from './pages/Starter.page.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-green-500'>hello world</h1>
      <StarterPage/>
    
    </>
  )
}

export default App
