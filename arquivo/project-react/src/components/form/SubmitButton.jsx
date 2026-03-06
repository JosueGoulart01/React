function SubmitButton({text}){
    
    return(
        <div>
            <button className="mt-5 text-2xl bg-mist-900 text-amber-50 px-3 py-1.5 rounded-full hover:bg-mist-500 transition-colors duration-300 ease-in" type="submit">{text}</button>
        </div>
    )
} export default SubmitButton