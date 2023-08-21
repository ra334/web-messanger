import { NavLink } from 'react-router-dom'
import './ButtonStyle.css'

interface ButtonValidate {
    path: string,
    text: string
}

export default function Button(props: ButtonValidate) {
    return <NavLink to={props.path} className='navlk_style'>{props.text}</NavLink>
}