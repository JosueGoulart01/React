function Input({type, text, name, placeholder, handleOnChenge, value}){
    
    return(
        <div className="flex flex-col">
            <label className="text-lg mb-4"
             htmlFor={name}>{text}</label>
            <input className="mb-4 p-0 placeholder:border-none text-lg bg-white text-black p-1.5 " 
            type={type} 
            name={name} 
            id={name}
            placeholder={placeholder} 
            onChange={handleOnChenge}
            value={value}/>
        </div>
    )
} export default Input