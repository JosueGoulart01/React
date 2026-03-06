import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import Projects from './components/pages/Projects'
import Company from './components/pages/Company'

import Container from './components/layout/Container'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import NewProject from './components/pages/NewProject'

function App() {
  return (
    <div>
    <Router>
      <NavBar/>
      <Container className="min-h-screen mt-10">
      <Routes className>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/company' element={<Company/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/Newproject' element={<NewProject/>}/>
        <Route exact path='/projects' element={<Projects/>}/>
      </Routes>
      </Container>
      <Footer/>
    </Router>
    </div>
  )
}
export default App
