import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import MessagesBlock from '../components/MessagesBlock'
import '../assets/styles/pages/MainPageStyle.css'


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