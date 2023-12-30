import { useEffect, useState } from "react";
import axios from 'axios';
import ProjectCard from "./ProjectCard";
import ReactModal from "react-modal";
import CreateForm from "./CreateForm";
import CreateProject from "./CreateProject";

export default function SideBar(){
    const [projects,setProjects] = useState([]);
    
    const [visible,setVisible] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:3001/projects').then(res=>{
            setProjects(res.data);
        }
        )
    },[])

    function changeState(val){
        setVisible(val);
    }

    return(
        <div className="h-screen">
            <div className="flex flex-col items-center">
            <div className="py-4 mt-2 font-bold text-lg flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.0049 14.6196H8.40343V17.6993H2.0049V14.6196ZM11.6015 14.6196H17.9959V17.6993H11.6015V14.6196ZM2 8.46015H17.9976V11.5399H2V8.46015ZM2.0049 2.30072H11.6031V5.38044H2.0049V2.30072ZM14.8011 2.30072H18V5.38044H14.8011V2.30072Z" fill="#263FA0"/>
            </svg>
            task Boards
            </div>
            {
                projects?
                <>
                <div className="w-10/12 flex flex-col gap-1.45 py-3">
                    {
                    projects.map(project=>( 
                        <ProjectCard {...project}/>
                    ))
                }
                </div>
                </>
                :
                <>
                <div>no projects available</div>
                </>
            }

            <div className="my-3 p-2.5 rounded-lg text-m flex items-center gap-3 cursor-pointer"  onClick={()=>setVisible(true)} >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
            </svg>
            <button className="text-blue-500">Add New Project</button>
            </div>
            </div>

            <ReactModal isOpen={visible} className="h-screen">

                <CreateProject changeState={changeState} />
                
            </ReactModal>

        </div>
    )
}