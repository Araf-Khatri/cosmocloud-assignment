import { Route, Routes } from 'react-router-dom'
import './App.css'
import Employees from './components/Employees'
import CreateEditEmployee from './components/CreateEditEmployee'

function App() {
  return (
    <Routes>
      {/* As we don't have default path, so considering 'Employee' component as default
      else we can use: `/employees`*/}
      <Route path='/' element={<Employees />} />
      <Route path='/create' element={<CreateEditEmployee type="CREATE" />} />
      <Route path='/edit/:id' element={<CreateEditEmployee type="EDIT" />} />
    
    
    </Routes>
  )
}

export default App
