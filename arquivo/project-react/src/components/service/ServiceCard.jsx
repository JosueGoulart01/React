function ServiceCard({ id, name, cost, description, handleRemove }) {
    
    const remove= (e) =>{

    }
    
    return(
       <div className="flex flex-col mt-4 border-2 rounded-2xl w-80">
       <h4 className="py-5 text-center bg-mist-900 text-amber-50 rounded-xl">
            {name}
        </h4>
        <p className=" pt-13 px-4 text-start">
            <span> Custo total:</span>R${cost}
        </p>
        <p className="py-4 px-4 text-start">{description}</p>
        <div className="my-5 mx-auto w-30 text-center text-2xl bg-mist-900 text-amber-50 px-3 py-1.5 rounded-full hover:bg-mist-500 transition-colors duration-300 ease-in inline-block">
            <button onClick={remove}>Excluir</button>
        </div>
        </div>
    )
  }  export default ServiceCard
