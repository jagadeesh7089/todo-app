import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { updatelogin } from "./loginslice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Register from "./register";
 
function Login(){
    var navigate=useNavigate()
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
     function res(e){
        console.dir(e)
        var re=document.getElementById("res")
            re.style.translate="410px"
            re.style.transition="1s"

            setTimeout(()=>{
                  re.style.zIndex="2"
                 lo.style.zIndex="1"
               setTimeout(()=>{
                re.style.translate=""
               },[400])      
              
            },[1000])
            var lo=document.getElementById("log")
            lo.style.transition="1.5s"
        
      
     }
    return(
        <div style={{height:"740px", }} id="bac" className="shadow-lg">
            <div id="log">
                <div style={{textAlign:"center",fontSize:"30px", height:"70px",paddingTop:"20px",
                    backgroundColor:" rgb(126,96,248)",color:"white"}}>Login Form</div>
                <div className="p-5">
               <form onSubmit={loginform.handleSubmit}>
               <i className="bi bi-person-circle icon"></i>
                 <input className="shadow-lg" type="text" placeholder="Username" {...loginform.getFieldProps("username")}/><br/><br/>
                 <i class="bi bi-lock-fill icon"></i>
                 <input  className="shadow-lg"  type="text" placeholder="Password" {...loginform.getFieldProps("password")}/><br/><br/>
                 <button className=" w-100 shadow-lg btn btn-primary">LOGIN</button> <hr></hr>
                 <p style={{textAlign:"center",color:"gray"}}>No account yet?</p>
                  <div  style={{textAlign:"center", color:"blue"}} onClick={(event)=>{res(event)}}>Create New account <br/></div>
                    
   
                 
               </form>
               </div>
            </div>
           <Register></Register>
        </div>

    )
}
export default Login