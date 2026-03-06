import {useNavigate } from 'react-router-dom'
import ProjectForm from "../project/ProjectForm"

function NewProject(){
    
    const navigate = useNavigate()
    function createPost(project){
        //initialize cost and services
        project.cost=0
        project.services = []

        fetch("http://localhost:5000/projects",{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project),
    })
    .then((resp) => resp.json())
        .then((data) =>{
            console.log(data)
            navigate('/projects',{state: {message: "Projeto criado com sucesso!"}})
        })
    .catch(err => console.log(err))
    }

    return(
        <div className="flex flex-col mx-auto items-center w-100">
            <h1 className="text-4xl mr-auto py-5">Criar Projeto</h1>
            <p className="text-2xl py-5">Crie seu projeto  para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}
export default NewProject