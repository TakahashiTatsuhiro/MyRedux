import {createSlice} from "@reduxjs/toolkit";

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment: state => {
      state.value +=1
    },
    decrement: state => {
      state.value -= 1
    }
  }
})

export default counterSlice
export const { increment, decrement } = counterSlice.actions