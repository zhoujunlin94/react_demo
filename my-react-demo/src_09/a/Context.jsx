import { createContext, useContext } from "react";

export const DispatchContext = createContext(null)
export const TaskContext = createContext(null)

export function useDispatch(){
    return useContext(DispatchContext)
}

export function useTask(){
    return useContext(TaskContext)
}