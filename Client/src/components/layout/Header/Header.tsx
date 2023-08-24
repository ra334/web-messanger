import Button from '../../ui/Button/ButtonNavLK'
import Logo from '../../ui/Logo/Logo'
import './HeaderStyle.css'

export default function Header() {
    return (
        <header className='header'>
            <>
                <Logo path='/'></Logo>
                <div className='header_register'>  
                    <Button path='/account' text='Account'></Button>
                    <Button path='/login' text='Login'></Button>
                    <Button path='/registration' text='Register'></Button>
                </div>
            </>
        </header>
    )
}