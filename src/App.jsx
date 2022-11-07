// SCSS
import './App.scss';

// React Router Dom
import { Route, Routes } from 'react-router-dom';

// COMPONENTS
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/admin/adminlayout/AdminLayout';
import About from './pages/About';
import Login from './components/login/Login';

// PAGES
import Home from './pages/Home';
import Contact from './pages/Contact';
import NoMatch from './components/nomatch/NoMatch';
import AdminHome from './pages/admin/adminhome/AdminHome';
import AdminTours from './pages/admin/admintours/AdminTours';
import AdminToursCreate from './pages/admin/admintourscreate/AdminToursCreate';
import AdminToursEdit from './pages/admin/admintoursedit/AdminToursEdit';
import AdminAbout from './pages/admin/adminabout/AdminAbout';
import SearchResult from './pages/SearchResult';
import Tours from './pages/Tours';

const App = () => {

  return (

    <div className="App">

    {/* Husk BrowserRouter i index.js */}
    {/* Husk LoginContextProvider i index.js */}

    <Routes>

      {/* PUBLIC DEL */}

      <Route path='/' element={<Layout />}> 
      
        <Route index element={<Home />} /> 
        <Route path="kontakt" element={<Contact />} /> 
        <Route path="om-os" element={<About />} /> 
        <Route path="tours" element={<Tours />} /> 
      
        <Route path="login" element={<Login />} /> 
        <Route path="search/:q" element={<SearchResult />} />

        <Route path="*" element={<NoMatch />} /> 
      
      </Route>

    {/* ADMIN DEL */}
              
      <Route path='/admin' element={<AdminLayout />}> 
      
        <Route index element={<AdminHome />} />  
        <Route path="admintours" element={<AdminTours />} />
        <Route path="admintoursopret" element={<AdminToursCreate />} />
        <Route path="admintoursret/:ID" element={<AdminToursEdit />} />
        <Route path="adminaboutret" element={<AdminAbout />} />
        <Route path="*" element={<NoMatch />} /> 
        
      </Route>

    </Routes>

    </div>
    
  );

};

export default App;