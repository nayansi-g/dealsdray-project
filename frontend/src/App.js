import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import AddEmployeePage from './Pages/AddEmployee/AddEmpoyeePage';
import EmployeesPage from './Pages/Employees/Employees';
import { useContext } from 'react';
import { AuthContext } from './context/auth.context';

function App() {
  const {data} = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={ data ? <Home /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/employees' element={ data ? <EmployeesPage /> : <Login />} />
          <Route path='/add_employee' element={ data ?  <AddEmployeePage />: <Login />} />
        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
