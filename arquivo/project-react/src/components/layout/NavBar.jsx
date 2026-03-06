import { Link } from "react-router-dom"
import Container from "./Container"
import { FaBitcoin } from "react-icons/fa";


function NavBar() {
    return (
        <Container>
            <nav className="h-25 w-full flex items-center justify-end gap-5 p-5 px-15 bg-mist-900 ">
                <Link className="h-full mr-auto" to="/">
                <FaBitcoin className="h-full w-auto object-contain text-amber-50" />
                </Link>
                <Link to="/" className="text-amber-50 hover:text-slate-300">Home</Link>
                <Link to="/projects" className="text-amber-50 hover:text-slate-300">Projetos</Link>
                <Link to="/contact" className="text-amber-50 hover:text-slate-300">Contato</Link>
                <Link to="/company" className="text-amber-50 hover:text-slate-300">Empresa</Link>
            </nav>
            </Container>
    )
}
export default NavBar