import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import Sidebar from '../../components/ui/Sidebar/Sidebar'
import MessagesBlock from '../../components/ui/MessageBlock/MessagesBlock'
import './MainPageStyle.css'


export default function Main() {
    return (
        <div className='mainpage_container'>
            <Header></Header>
            <div className="box">
                <Sidebar></Sidebar>
                <MessagesBlock></MessagesBlock>
            </div>
            <Footer></Footer>
        </div>
    )
}