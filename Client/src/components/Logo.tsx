import { NavLink } from 'react-router-dom'

interface LogoPropsValidate {
    path: string,
}

export default function Logo(props: LogoPropsValidate) {
    return <NavLink to={props.path}><svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18L12 4z"/></svg></NavLink>
}