import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { updatelogin } from "./loginslice";
 
function Login(){
    var dispatch=useDispatch()
    var loginform=useFormik({
        initialValues:{
            username:"",
            password:""
        },
        onSubmit:(values)=>{
            fetch("http://localhost:4000",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(values)
            }).then(res=>{return res.json()}).then(data=>{
                    console.log(data)
                    if(data.msg==="loginsuccess"){
                        window.localStorage.setItem("user",JSON.stringify(data))
                        dispatch(updatelogin({status:true,user:data}))
                    }
            })
        }
    })
    return(
        <div>
            <div>
               <form onSubmit={loginform.handleSubmit}>
                 <input  type="text" placeholder="username" {...loginform.getFieldProps("username")}/><br/><br/>
                 <input  type="text" placeholder="password" {...loginform.getFieldProps("password")}/><br/><br/>
                 <button>LOGIN</button>
               </form>
            </div>
        </div>

    )
}
export default Login