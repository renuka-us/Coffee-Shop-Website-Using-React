import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Services from './pages/Services';
import Reservation from './pages/Reservation';
import Testimonial from './pages/Testimonial';
import Contact from './pages/Contact';
import BackToTop from './components/BackToTop';




function App() {
 return (

   
   <div className="App">
     <Navbar />
     <BackToTop/>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path='/services' element={<Services/>} />
            <Route path='/reservation' element={<Reservation/>} />
            <Route path='/testimonial' element={<Testimonial/>} />
            <Route path='/contact' element={<Contact/>} />
          </Routes>
      <Footer />
   </div>

 );
}

export default App;
