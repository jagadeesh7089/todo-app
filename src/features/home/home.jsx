import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatelogin } from "../login/loginslice";
import { useGetAlltodosQuery, useLazyGetAlltodosQuery, useUpdatestatustodoMutation, useUpdatetodoMutation, } from "../../services/todosApi";
function Home(){
   var [lazyTodoFn]=useLazyGetAlltodosQuery()
     var [newtodo,setNewtodo]=useState()
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
       var temp=JSON.parse(JSON.stringify(data[0]))
        temp.todos.push({
              todo:newtodo,
              status:true
        }) 
       updateFn(temp).then(res=>{
        console.log(res.data)
        lazyTodoFn()
       })
       var tt=document.getElementById("d1")
       tt.value=""
    }
    function done(todos){
         var temp=JSON.parse(JSON.stringify(data[0]))
            temp.todos.map(updtodo=>{
                
                if(todos.todo===updtodo.todo){
                    return updtodo.status=false
                }
            })
            updatestatusFn(temp).then(res=>{
               
            })
         
    }
    return(
        <div>
            <div className="d-flex">
            <h3>Home</h3>
            <h3><button onClick={()=>{logout()}}>Logout</button></h3>
            </div>
            <div>
                {
                  !isLoading && data.map(t=>{
                        return <div>{t.username}todolist</div>
                    })
                }
            </div>
            <div>
                <input type="text" onChange={(e)=>{setNewtodo(e.target.value)}} id="d1"/> &nbsp;&nbsp;
                <button onClick={()=>{addtask()} } className="btn btn-info">Add task</button>
            </div>
            <div>
                {
                  !isLoading&& data[0].todos.map(todos=>{
                        return  <p className="d-flex w-25 "> <p style={{width:"50%"}}>{todos.todo}</p>
                                     {todos.status? <button onClick={()=>{done(todos)}}>Done</button>:<button>Undo</button>} &nbsp;
                                     <button>Delete</button>
                                 </p>
                            
                  })
                }
            </div>
           
        </div>
    )
}
export default Home