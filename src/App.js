
import Header from './components/Header';

import memo from './Memo/index';
import ide from './Ide/index';
import project from './project/index'
import agenda from './agenda/index';
import aktifitas from './aktifitas/index';
import meeting from './meeting/index';
import Sidebar  from './components/Sidebar';
import Footer from './components/Footer';
import {Home} from './pages/Home';
import Login from './login/login';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    
    <Header/>
        
         <Routes>
         <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
         <Route  path="/login" Component={Login} />
          <Route exact path="/" element={<Home />} />
          <Route  path="/Ide" Component={ide} />
          <Route  path="/project" Component={project} />
          <Route  path="/agenda" Component={agenda} />
          <Route  path="/aktifitas" Component={aktifitas} />
          <Route  path="/meeting" Component={meeting} />
          <Route  path="/memo" Component={memo} />
         
       </Routes>
       <Sidebar/>
       <Footer /> 

       </>
  );
}
  // }

export default App;
