function Select({ text, name, options, handleOnChange, value }) {
    return (
        <div className="flex flex-col">
            <label className="text-lg mb-4"  htmlFor={name}>
                {text}
            </label>
            
            <div className="relative mb-4">
                <select
                    className="w-full text-lg bg-white text-black p-1.5 appearance-none border-none outline-none cursor-pointer"
                    type={text}
                    name={name}
                    id={name}
                    onChange={handleOnChange}
                    value={value || ''}
                >
                    <option value="" disabled>Selecione uma opção</option>
                    
                    {options && options.map((opt) => (
                        <option
                            key={opt.id} 
                            value={opt.id} 
                            className= " bg-white text-black p-1.5"
                        >
                            {opt.name}
                        </option>
                    ))}
                </select>
                
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Select;