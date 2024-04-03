import { createSlice , createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  user: {},
  name : '',
  email : '',
  password: ''
}

export const registerUser = createAsyncThunk('user/registerUser', async (formdata , {rejectWithValue})=>{
    try {
        console.log(formdata)
        const response = await axios.post('http://localhost:3000/user/register', formdata)
        console.log(response.data);
    } catch (error) {
        return rejectWithValue(error.response.data);

    }

})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending , (state)=>{
        state.loading= true
    })
    .addCase(registerUser.fulfilled,(state, action)=>{
        state.loading= false,
        state.user = action.payload
    })
  }
})

// Action creators are generated for each case reducer function

export default userSlice.reducer