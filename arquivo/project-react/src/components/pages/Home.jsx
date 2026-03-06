import LinkButton from "../layout/LinkButton"
function Home(){

    return(
        <section className="w-full flex flex-col items-center justify-center p-4">
            <h1 className=" text-4xl mt-2">
                Bem-vindo ao <span className="bg-mist-900 text-amber-50 p-1">Costs</span> 
            </h1>
            <p className="my-8 text-slate-700 text-2xl">Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to="/newProject" text="Criar Projeto"/>
            <img className="w-100 my-15" src="/public/img/porco.png" alt="Costs" />

        </section>
    )
}
export default Home