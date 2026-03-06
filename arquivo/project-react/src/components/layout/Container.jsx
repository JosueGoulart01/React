
function Container({ children, className }) {
    return(
       <div className={` flex flex-wrap gap-4 justify-center w-full ${className || ''} text-3xl `}>{children}</div>
    )
}
export default Container