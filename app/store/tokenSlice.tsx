"use client"
import { TokenInfo } from '@/services/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface tokenState{
    tokens:TokenInfo[]
}

const initialState:tokenState={
    tokens:[]
}

export const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers:{
    setTokens(state,action:PayloadAction<TokenInfo[]>){
        state.tokens=action.payload;
    }
  }


})


export const {setTokens}=tokenSlice.actions;
export default tokenSlice.reducer;