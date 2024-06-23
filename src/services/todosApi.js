import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000',
    prepareHeaders:(headers,{getState})=>{
        var token=JSON.parse(window.localStorage.getItem("user")).token
        console.log("token in Api",token)
        headers.set("token",token)
        return headers
     }

   }),
  endpoints: (builder) => ({
    getAlltodos: builder.query({
      query: (username) => `/todolist?username=${username}`,
    }),
    updatetodo:builder.mutation({
      query:(todo)=>{
        return {
          url:`/todolist/${todo.id}`,
          method:`PUT`,
          body:todo
        }
      }
    }),

    updatestatustodo:builder.mutation({
      query:(todos)=>{
        return{
          url:`/todolist/${todos.id}`,
          method:`PUT`,
          body:todos
        }
      }
    })
  }),
})

export const {
   useGetAlltodosQuery,
   useLazyGetAlltodosQuery,
  useUpdatetodoMutation,
  useUpdatestatustodoMutation,
} = todosApi

