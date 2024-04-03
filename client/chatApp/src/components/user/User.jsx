import React from 'react'
import { useState } from 'react'
import { registerUser } from '../../store/feature/useSlice'
import { useDispatch , useSelector } from 'react-redux'

const User = () => {
const [email , setEmail] = useState('')
const [name, setName] = useState('')
const [password , setPassword] = useState('')
const dispatch = useDispatch();
const loading = useSelector((state) => state.user.loading)
const handleSubmit = (e)=>{
    e.preventDefault()
    const data = {
        name : name ,
        email:email,
        password: password
    }
dispatch(registerUser(data))
}

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='name ' onChange={(e)=>{setName(e.target.value)}}  />
        <input type="text" name='email' placeholder='email ' onChange={(e)=>{setEmail(e.target.value)}}  />
        <input type="text" name='password' placeholder='password ' onChange={(e)=>{setPassword(e.target.value)}}  />
        <button type='submit'>submit</button>


      </form>
      <h1>{loading && 'its loading'}</h1>
    </div>
  )
}

export default User
