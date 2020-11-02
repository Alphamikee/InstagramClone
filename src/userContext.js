import React , {createContext , useReducer} from "react";
export const LoginContext = createContext();
    const reducer = (state,pair) => ({...state,...pair});
    const initialState = {
        Login: false,
        email: null,
        Photos: {},
        password: '',
        userId: null,
        fullName: null,
        profilePhoto:'',
        availabeUsers: null,
        UID: null,
        allUsersData: [{
            profilePhoto: null,
            followers: [],
            following: [] ,
            userId: 'hi'
        }],
        target: null,
        targetUser: {
            fullName: null,
            userId: null,
            followers: null,
            following: [],
            photo: null,
            id: null
        },
        Posts: [{Author : {userId: 'hi'} , Comments : [] , likes : [ ]}],
        array: [
            {
                userId : 'Alpha' , 
                nums : [1,2,3,4,5]
            } ,
            {
                userId: 'Alpha2',
                nums : [6,7,8,9,0]
            }
        ] , 
        Stories: [] 
    }
export function ObjectProvider(props){
    const [state, update] = useReducer(reducer, initialState)
    return (
   <LoginContext.Provider value={{state,update}}>
       {props.children}
   </LoginContext.Provider>
    )}    