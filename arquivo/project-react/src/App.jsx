import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import Projects from './components/pages/Projects'
import Company from './components/pages/Company'

import Container from './components/layout/Container'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import NewProject from './components/pages/NewProject'
import Project from './components/pages/Project'

function App() {
  return (
    <div>
    <Router>
      <NavBar/>
      <Container className="min-h-screen mt-10">
      <Routes className>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/company' element={<Company/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/Newproject' element={<NewProject/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/project/:id' element={<Project/>}/>
      </Routes>
      </Container>
      <Footer/>
    </Router>
    </div>
  )
}
export default App
