import React , {useState ,createContext} from "react";
export const LoginContext = createContext();
export function LoginProvider(props){
   let [loginState,setLogin] = useState(false);
   function setLoginState(value){
       return setLogin(value);
   }
    return (
        <LoginContext.Provider value={[loginState,setLoginState]}>
            {props.children}
        </LoginContext.Provider>
    );
}