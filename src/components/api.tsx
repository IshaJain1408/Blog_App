import React, { useState } from 'react'
interface Tdata{
  name1:string
}
interface userProps{
  name2:string,
  age:number
}

const Api : React.FC<Tdata & userProps>=({name1,name2,age}) => {
  const [counter,setCounter]=useState<number>(0)
  const [TextInput,setTextInput]=useState<string>('')
  const [text,setText]=useState<string[]>([])

  function hndlesubmit(e:React.FormEvent<HTMLFormElement>){

e.preventDefault()
setText([...text,TextInput])
  }

  return (
    <div>api {name1}{name2}{age}
    <br/>
       <button onClick={(()=>{
    setCounter(counter-1)

   })}>-</button>

   <h1>{counter}</h1> 
   <button onClick={(()=>{

    setCounter(counter+1)

   })}>+</button>

   <form onSubmit={hndlesubmit}>
    <input type="text" onChange={((e)=>{setTextInput(e.target.value)})} />
    <button type='submit'>,mn,m</button>
   </form>
   <h1>{TextInput}</h1>
   <ul>
    {
      text.map((item,index)=>(
        <li key={index}>{item}</li>
      ))
    }
   </ul>
    
    </div>

  )
}

export default Api