import { Link, useNavigate } from "react-router-dom"

export default function ProjectCard({id,name}){
    const navigate = useNavigate();
    return(
        <Link to={`/${id}`}>
            <div className="bg-todo-primary px-4 py-3 my-1 rounded-lg font-medium text-sm transition ease-in delay-250 ">
            {name}
        </div>
        </Link>
    )
}