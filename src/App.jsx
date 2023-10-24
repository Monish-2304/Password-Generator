import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'


function App() {
  const [length,setLength]=useState(8)
  const [numAllowed,setNumAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("")
  const passRef=useRef(null)

 
  const passwordGen=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="~!@#$%^&*()-=*/?><,.:;[]{}|'"
    
    for(let i=1;i<=length;i++){
      let index=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(index)
    }
    setPassword(pass)
  },[length,numAllowed,charAllowed,setPassword])
  
  const copyPasswordToClipboard=useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=>{
passwordGen()
  },[length,charAllowed,numAllowed,passwordGen])
  
  
  return (
    <>
    <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 mt-48 bg-gray-700 text-orange-500">

    <h1 className=' text-4xl text-center mt-2 text-white'>Password Generator</h1>
    <div className="flex shadow overflow-hidden rounded-lg my-4">
      <input
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3 rounded-lg'
      placeholder='password'
      readOnly
      ref={passRef}
      />
      <button onClick={copyPasswordToClipboard} className=" outline-none bg-orange-400 text-white rounded-md mx-2 p-1 shrink-0">Copy</button>
    </div>
    <div className=' flex text-sm gap-x-5'>
      <div className=' flex items-center gap-x-1'>
        <input
        type="range"
        min={6}
        max={100}
        value={length}
        className=' cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>Length:{length}</label>
      </div>
      <div className=' flex items-center gap-x-1'>
        <input
        type="checkbox"
        defaultChecked={numAllowed}
        id='numberInput'
        onChange={()=>{
          setNumAllowed((prev)=>!prev);
        }
      }
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className=' flex items-center gap-x-1'>
        <input
        type="checkbox"
        defaultChecked={charAllowed}
        id='numberInput'
        onChange={()=>{
          setCharAllowed((prev)=>!prev);
        }
      }
        />
        <label htmlFor="numberInput">Characters</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
