import { useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

import Message from "../layout/Message"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import Loading from '../layout/Loading'
import ProjectCard from '../project/ProjectCard'

function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [displayMessage, setDisplayMessage] = useState('')

    const location = useLocation()
    // Usamos um Ref para garantir que processamos a mensagem da URL apenas uma vez
    const messageProcessed = useRef(false)

    useEffect(() => {
        // Se houver mensagem no state da navegação e ainda não processamos
        if (location.state?.message && !messageProcessed.current) {
            setDisplayMessage(location.state.message)
            messageProcessed.current = true // Marca como lido
            
            // Limpa o estado da navegação para não repetir ao dar F5
            window.history.replaceState({}, document.title)
        }
    }, [location])

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then((data) => {
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
    }, [])

    function removeProject(id) {
        setDisplayMessage('') // Reseta para permitir que a nova mensagem apareça

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setDisplayMessage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Meus Projetos</h1>
                <LinkButton to="/newProject" text="Criar Projeto" />
            </div>

            {/* Renderização condicional direta para evitar conflitos */}
            {displayMessage && <Message type="success" msg={displayMessage} />}

            <Container>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category?.name || 'Sem Categoria'}
                            handleRemove={removeProject}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados.</p>
                )}
            </Container>
        </div>
    )
}

export default Projects