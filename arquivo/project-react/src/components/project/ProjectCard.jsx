import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import LinkButton from '../layout/LinkButton'

function ProjectCard({ id, name, budget, category, handleRemove }) {
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }
    const categoryColors = {
        'Infra': 'bg-red-500',
        'Design': 'bg-pink-500',
        'Planejamento': 'bg-blue-500',
        'Desenvolvimento': 'bg-green-500',
        'default': 'bg-gray-400'
    };
    const dotColor = categoryColors[category] || categoryColors['default'];


    return (
        <div className="p-4 w-full sm:w-1/2 lg:w-1/4 m-4 border-2 rounded-lg">
            <h4 className='p-1 bg-mist-900 opacity-2000 text-center text-amber-50'>{name}</h4>
            <p className='py-5 text-xl'>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className="flex items-center text-xl">
                <span className={`w-3 h-3 rounded-full mr-2 ${dotColor}`}></span>
                {category}
            </p>
            <div className='py-5 ml-3 grid grid-flow-col grid-rows-1 gap-2 text-2xl'>
                <div><LinkButton to={`/Project/${id}`} text="Editar" /></div>
                <div><LinkButton onClick={(e) => {
                    if (window.confirm("Tem certeza que deseja excluir?")) {
                        remove(e);
                    }
                }} text="Excluir" /></div>
            </div>
        </div>
    )
} export default ProjectCard