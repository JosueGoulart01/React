import { useLocation, useNavigate } from 'react-router-dom'
import Message from "../layout/Message"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import Loading from '../layout/Loading'
import ProjectCard from '../project/ProjectCard'
import { useEffect, useState } from 'react'

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    const [message, setMessage] = useState('')

useEffect(() => {
    if (location.state && location.state.message) {
        setMessage(location.state.message)

        navigate(location.pathname, {
            replace: true,
            state: null
        })
    }
}, [location])

    // Buscar projetos
    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
    }, [])

    // Remover projeto
    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage('Projeto removido com sucesso!')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl">Meus Projetos</h1>
                <LinkButton to="/newProject" text="Criar Projeto" />
            </div>

            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}

            <Container>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={removeProject}
                        />
                    ))}

                {!removeLoading && <Loading />}

                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos</p>
                )}
            </Container>
        </div>
    )
}

export default Projects