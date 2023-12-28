import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProject({changeState}){

    const [send,setData] = useState({
        name:'',
    })

    const[errors,setErrors] = useState({})

    const postSubmit=async(e)=>{
        e.preventDefault();

        if(send.name===""){
            setErrors({name:'please enter the project name'});
        }

        if(send.name!=""){
            axios.post(`http://localhost:3001/createProject`,send).then(res=>{
                window.alert(res.data);
                window.location.reload();
                changeState(false);
            })
        }
   
    }

    const handleChange = (e) =>{
        setData((PrevState)=>({
            ...PrevState,
            [e.target.name]:e.target.value
        })
        )
    }

    
    return(
        <div className="h-screen flex justify-center items-center bg-opacity-70 bg-black">

            <form className="flex flex-col bg-white rounded w-1/2 h-60 gap-6 p-9" onSubmit={postSubmit} id="createForm">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="name">enter the project name</label>
                        <input type="text" name="name" placeholder="project name" className=" h-10 border-2 p-2 rounded" onChange={handleChange}/>
                        {errors.name && <p className="text-red-600 text-sm ml-1 mt-1">{errors.name}</p>}
                    </div>

                    <div className="flex gap-4 justify-end mt-3">
                        <button onClick={()=>changeState(false)} className="bg-blue-300 rounded text-white px-4">cancel</button>
                        <button form="createForm" className="bg-blue-400 rounded text-white px-5 py-1" onSubmit={postSubmit}>save</button>
                    </div>

            </form>
        </div>
    )
}