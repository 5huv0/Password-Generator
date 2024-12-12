import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function MainPage() {   

  
  // useRef --------- useRef is used for References


  const passRef = useRef(null)


  // useState Hook ------ useState is used to change the state of functions

  const [length , setLength] = useState(8)                                  // this is for the length slider
  const [charAllowed , setcharAllowed] = useState(false)                    // this is for the char checkbox
  const [numAllowed , setnumAllowed] = useState(false)                      // this is for the num checkbox
  const [password , setPassword] = useState(" ")                            // this is for the pass input box


  // useCallback Hook ------ useCallback Memoize functions to avoid recreation.

  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIOJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"      

    if(numAllowed){
     str += "0123456789" 
    }

    if(charAllowed){
      str += "!@#$%^&*-_+/?" 
    }

    for(let i = 1 ; i <= length ; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length , numAllowed , charAllowed, setPassword])

  const copyPass = useCallback(() => {
    passRef.current?.select()
    // passRef.current?.setSelectionRange(0, 5) // this line is for manually select option using range
    window.navigator.clipboard.writeText(password)
  } ,[password])


  // useEffect Hook ------ useEffect Fetch data


  useEffect(() => {
    passGenerator()                                                          
  }, [length , numAllowed, charAllowed, passGenerator])


  return (
    <div>
      <div className='bg-slate-700 text-white p-9 m-7'>
        <p className='flex justify-center p-2 text-amber-300 text-5xl font-bold'>Password Generator</p>
        <div className='m-4 flex justify-center'>
          <label >
            <input
            type="text"
            value={password}
            ref={passRef}
            className='p-3 outline-none rounded-l-lg text-black' 
            readOnly 
            style={{width:'600px'}} />
            <button
            className='bg-black text-white p-3 w-100 rounded-r-lg hover:bg-black active:bg-gray-500'
            onClick={copyPass}>
              copy
            </button>
          </label>          
        </div>

        <div className='m-4 gap-6 flex justify-center text-xl'>
          <label >
            <input 
            type="range"
            min={8}
            max={20}
            value={length}
            onChange={(e) => {setLength(e.target.value)}}
            className='m-2'/>
            Generate Passwords ({length})
          </label>

          <label >
            <input
            type="checkbox" 
            className='m-3'
            defaultChecked = {numAllowed}
            onChange={() => {
              setnumAllowed((prev) => !prev)
            }}/>
            Numbers
          </label>

          
          <label >
            <input
            type="checkbox"
            className='m-3'
            defaultChecked = {charAllowed}
            onChange={() => {
              setcharAllowed((prev) => !prev)
            }}/>
            Characters
          </label>
        </div>

      </div>
    </div>
  )
}
