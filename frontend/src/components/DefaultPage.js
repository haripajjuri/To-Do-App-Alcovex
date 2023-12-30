import img from '../logo.png' 
export default function DefaultPage(){
    return(
        <div className="h-screen flex justify-center items-center opacity-50 flex-col">
            <p className='font-semibold text-todo-textPrimary'>BROWSE  YOUR  PROJECTS</p>
            <img className='w-2/5' src={img} alt="" />
        </div>
    )
}