import React , {useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { LoginContext } from './userContext'
export default function Testing(props) {
    const [Context,setContext] = useContext(LoginContext)
    return (
        Context.Login ? <div>
            hi{props.name}
        </div> : <Redirect to='/Login' />
    )
}
