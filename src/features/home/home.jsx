import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatelogin } from "../login/loginslice";
import { useGetAlltodosQuery, useLazyGetAlltodosQuery, useUpdatestatustodoMutation, useUpdatetodoMutation, } from "../../services/todosApi";
function Home(){
     
     var [lazyTodoFn] = useLazyGetAlltodosQuery()
      var [newtodo,setNewtodo]=useState("")
      var [updateFn]=useUpdatetodoMutation()
    var [updatestatusFn] =  useUpdatestatustodoMutation()
    var {user} =useSelector(state=>state.loginReducer)
      var {isLoading,data}= useGetAlltodosQuery(user.username) 
    //   console.log(data)   
    var dispatch=useDispatch()
    function logout(){
        window.localStorage.removeItem("user")
        dispatch(updatelogin(false))
    }

    function addtask(){
        
      if(!document.getElementById("d1").value==""){
        console.log(newtodo)
       var temp=JSON.parse(JSON.stringify(data[0]))
       temp.todos.push({
             todo:newtodo,
             status:true
       }) 
       updateFn(temp).then(res=>{
        lazyTodoFn(user.username)
      
       })
       var tt=document.getElementById("d1")
       tt.value=""

      }  
    }

    function done(todos){
         var temp=JSON.parse(JSON.stringify(data[0]))
            temp.todos.map(updtodo=>{
                
                if(todos.todo===updtodo.todo){
                    return updtodo.status=false
                }
            })
            updatestatusFn(temp).then(res=>{
                lazyTodoFn(user.username)
               
            })
         
    }
    function undo(todos){
        var temp=JSON.parse(JSON.stringify(data[0]))
            temp.todos.map(updtodo=>{
                
                if(todos.todo===updtodo.todo){
                    return updtodo.status=true
                }
            })
            updatestatusFn(temp).then(res=>{
                lazyTodoFn(user.username)
            
            })
    }
    function deletetodo(todos){
        var ar=[]
       var temp=JSON.parse(JSON.stringify(data[0]))
           temp.todos.map(deltodo=>{
            
            if(!(todos.todo===deltodo.todo)){
               ar.push(deltodo)
                
            }

           })
          temp.todos=[...ar]
          updatestatusFn(temp).then(res=>{
            lazyTodoFn(user.username)
            
          })    
          
    }
    return(
        <div>
            <div className="d-flex justify-content-between bg bg-primary p-2">
            <h3 style={{color:"white"}}>TODO-LIST</h3>
            <button onClick={()=>{logout()}} className="btn btn-danger">Logout</button>
            </div>
            <div className="p-3  bg bg-light shadow-lg">
                
            <div>
                {
                  !isLoading && data.map(t=>{
                        return <div className="fs-4 text-danger text-center">{(t.username)}todolist</div>
                    })
                }
            </div>
            <div className="mb-4 text-center">
                <input type="text" onChange={(e)=>{setNewtodo(e.target.value)}} className="border border-2 w-25" id="d1" /> &nbsp;&nbsp;
                <button onClick={()=>{addtask()} } className="btn btn-info ">Add task</button>
            </div>
            <div>
                {
                  !isLoading&& data[0].todos.map(todos=>{
                        return  <p style={{margin:"1% 35%"}} className="d-flex  bg bg-light shadow-lg p-3">  <p style={todos.status?{width:"60%"}:{width:"60%",color:"red",textDecoration:"line-through"}}>{todos.todo}</p>
                                     {todos.status? <button onClick={()=>{done(todos)}} className="btn btn-success">Done</button>:<button onClick={()=>{undo(todos)}} className="btn btn-warning">Undo</button>} &nbsp;
                                     <button onClick={()=>{deletetodo(todos)}} className="btn btn-danger">Delete</button>
                                 </p>
                            
                  })
                }
            </div>
            </div>
           
        </div>
    )
}
export default Home