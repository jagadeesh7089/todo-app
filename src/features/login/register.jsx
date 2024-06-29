import React from "react";
import { useNavigate } from "react-router-dom";

 function Register(){
     function sig(e){
      var lo=document.getElementById("log")
      lo.style.translate="-410px"
      lo.style.transition="1.5s"
       var re=document.getElementById("res")
        
         setTimeout(()=>{
              re.style.zIndex="1"
              lo.style.zIndex="2"
              setTimeout(()=>{
                 lo.style.translate=""
              },[400])
         },[1000])

     }
    return(
        <div id="res" className="shadow-lg">
           <div style={{textAlign:"center",fontSize:"30px", height:"70px",paddingTop:"20px",
                    backgroundColor:" rgb(126,96,248)",color:"white"}}>Signup Form</div>
            <div className="p-5">
                <form>
                <i className="bi bi-person-circle icon"></i>
                <input className="shadow-lg" type="text" placeholder="Username"/><br/><br/>
                <i class="bi bi-envelope icon"></i>
                <input className="shadow-lg" type="text" placeholder="Email"/><br/><br/>
                <i class="bi bi-lock-fill icon"></i>
                <input className="shadow-lg" type="password" placeholder="Password"/><br/><br/>
                
                </form>
                <button className="w-100 btn btn-primary" onClick={(e)=>{sig(e)}}>Signin</button>
            </div>
       
           
        </div>
    )
 }
 export default Register