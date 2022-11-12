// SCSS
import './App.scss';

// React Router Dom
import { Route, Routes } from 'react-router-dom';

// COMPONENTS
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/admin/adminlayout/AdminLayout';
import Login from './components/login/Login';

// PAGES
import NoMatch from './components/nomatch/NoMatch';
import AdminHome from './pages/admin/adminhome/AdminHome';
import AdminNews from './pages/admin/adminnews/AdminNews';
import AdminNewsEdit from "./pages/admin/admintoursedit/AdminNewsEdit";
import AdminAbout from './pages/admin/adminabout/AdminAbout';
import SearchResult from './pages/SearchResult';
import Forside from './pages/Forside';
import Kontakt from './pages/Kontakt';
import Omos from './pages/Omos';
import Service from './pages/Service';
import Faq from './pages/Faq';
import Nyheder from './pages/Nyheder';

const App = () => {

  return (

    <div className="App">

    {/* Husk BrowserRouter i index.js */}
    {/* Husk LoginContextProvider i index.js */}

    <Routes>

      {/* PUBLIC DEL */}
      
      <Route path='/' element={<Layout />}> 
      
        <Route index element={<Forside />} /> 
        <Route path="kontakt" element={<Kontakt />} /> 
        <Route path="service" element={<Service />} /> 
        <Route path="faq" element={<Faq />} /> 
        <Route path="nyheder" element={<Nyheder />} /> 
        <Route path="om-os" element={<Omos />} /> 

        <Route path="login" element={<Login />} /> 
        <Route path="search/:q" element={<SearchResult />} />

        <Route path="*" element={<NoMatch />} /> 
      
      </Route>

    {/* ADMIN DEL */}
              
      <Route path='/admin' element={<AdminLayout />}> 
      
        <Route index element={<AdminHome />} />  
        <Route path="adminnews" element={<AdminNews />} />
        <Route path="adminnewssret/:ID" element={<AdminNewsEdit />} />
        <Route path="adminaboutret" element={<AdminAbout />} />
        <Route path="*" element={<NoMatch />} /> 
        
      </Route>

    </Routes>

    </div>
    
  );

};

export default App;