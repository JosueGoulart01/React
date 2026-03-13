import { parse, v4 as uuidv4 } from "uuid"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../layout/Loading"
import ProjectForm from "../project/ProjectForm"
import Message from "../layout/Message"
import Container from "../layout/Container"
import ServiceForm from "../service/ServiceForm"
import ServiceCard from "../service/ServiceCard"

function Project() {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }
    function removeService(id, cost){

    }

    function createService(){
        setMessage('')
        
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setMessageType('error')
            project.services.pop()
            return false    
        }
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:'PATCH',
            headers: {'Content-Type': 'application'},
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then((data => {
            console.log(data)
        }))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if (!id) return

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(resp => resp.json())
            .then(data => {
                setProject(data)
                setServices(data.services)
            })
            .catch(err => console.log(err))
    }, [id])

    function editPost(project) {
        setMessage('')
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setMessageType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
                setShowProjectForm(false)
                setMessage('Projeto atualizado com sucesso!')
                setMessageType('success')
            })
            .catch(err => console.log(err))
    }

    if (!project) return <Loading />

    return (
        <div className="my-0 px-20 py-10">
            {message && <Message type={messageType} msg={message} />}

            <div className="flex">
                <h1 className="text-2xl text-amber-50 mb-4 bg-mist-900 p-3">
                    Projeto: {project.name}
                </h1>
                <button
                    className="bg-mist-900 text-xl text-amber-50 h-10 w-40 ml-130 
                             hover:bg-mist-500 transition-colors duration-300"
                    onClick={toggleProjectForm}
                >
                    {!showProjectForm ? "Editar projeto" : "Fechar"}
                </button>
            </div>

            {!showProjectForm ? (
                <div className="flex flex-col mt-5 ">
                    <div className="py-10 w-full text-mist-900 bg-white border-2 rounded-lg">
                        <p className="mb-4 px-10 text-2xl">
                            <span className="text-3xl font-bold mr-2">Categoria:</span>
                            {project.category.name}
                        </p>
                        <p className="mb-4 px-10 text-2xl">
                            <span className="text-3xl font-bold mr-2">Total de orçamento:</span>
                            R$ {project.budget}
                        </p>
                        <p className="mb-4 px-10 text-2xl">
                            <span className="text-3xl font-bold mr-2">Total utilizado:</span>
                            R$ {project.cost}
                        </p>
                    </div>
                    <div>
                        <div className="flex mt-12">
                            <h2 className="text-2xl font-bold mb-4 p-3">Adicione serviços:</h2>
                            <button
                                className="bg-mist-900 text-xl text-amber-50 h-10 w-40 ml-120 
                             hover:bg-mist-500 transition-colors duration-300"
                                onClick={toggleServiceForm}
                            >
                                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
                            </button>
                        </div>
                        <div className="flex  py-10 w-full text-mist-900 bg-white border-2 rounded-lg">
                            {showServiceForm && (
                                <ServiceForm
                                handleSubmit={createService}
                                btnText="Adicionar Serviço"
                                projectData={project}
                                
                                />
                            )}
                        </div>

                    </div>

                    <div>
                        <h2 className="font-bold text-2xl">Serviços:</h2>
                        <Container>
                            {project.services.length < 0 && <p>Não há serviços cadastrados.</p>}
                            {project.services.length > 0 &&
                                project.services.map((service) => (
                                    <ServiceCard 
                                    id={service.id} 
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                 />
                                ))
                            }
                        </Container>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col py-10">
                    <ProjectForm
                        handleSubmit={editPost}
                        btnText="Concluir edição"
                        projectData={project}
                    />
                </div>
            )}
        </div>
    )
}

export default Project