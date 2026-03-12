import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Message from "../layout/Message"
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import Loading from '../layout/Loading'
import ProjectCard from '../project/ProjectCard'

function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('success')

    const location = useLocation()

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message)
            setMessageType('success')
            
            // Limpar o state da localização
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
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setMessage('Projeto removido com sucesso!')
            setMessageType('success')
        })
        .catch(err => {
            console.log(err)
            setMessage('Erro ao remover projeto!')
            setMessageType('error')
        })
    }

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Meus Projetos</h1>
                <LinkButton to="/newProject" text="Criar Projeto" />
            </div>
            
            {message && <Message type={messageType} msg={message} />}

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
                    <p className="text-center text-gray-500 mt-8">
                        Não há projetos cadastrados.
                    </p>
                )}
            </Container>
        </div>
    )
}

export default Projects