import Login from './components/Login'
import SingUp from './components/SingUp';
import Home from './components/Home';
import Shifts from './components/Shifts';
import About from './components/About';
import Cuts from './components/Cuts';
import Partners from './components/Partners';
import Payment from './components/Payment';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IsLoggedInContext } from './context/IsLoggedContext'
import { ParentComponent } from './context/InputDataShContext'
import { ParentPaComponent } from './context/InputDataPaContext'

function App() {

  return (

    <BrowserRouter>

      <IsLoggedInContext>

        <ParentPaComponent>

        <ParentComponent>
        
          <Routes>

            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/singUp" element={<SingUp/>}/>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/shifts" element={<Shifts/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/cuts" element={<Cuts/>}/>
            <Route exact path="/partners" element={<Partners/>}/>
            <Route exact path="/payment" element={<Payment/>}/>

          </Routes>

          <ToastContainer />

        </ParentComponent>

        </ParentPaComponent>

      </IsLoggedInContext>

            

    </BrowserRouter>

  )

}

export default App
