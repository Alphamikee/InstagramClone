import React , {useState ,createContext , useReducer} from "react";
export const LoginContext = createContext();
    const reducer = (state,pair) => ({...state,...pair});
    const initialState = {
        Login: false,
        email: null,
        password: null,
        userId: null,
        fullName: null,
        profilePhoto:''
    } 
    export function LoginProvider(props){
         const [state, update] = useReducer(reducer, initialState)
    return (
        <LoginContext.Provider value={[state,update]}>
            {props.children}
        </LoginContext.Provider>
    );
}