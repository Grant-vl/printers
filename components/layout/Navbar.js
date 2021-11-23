import Link from "next/link";
import { Menu, Layout } from "antd";
import "antd/dist/antd.css";

function Navbar () {

    const { Header } = Layout;

    return(
        <Header style={{height: '8vh', width: '100vw', padding:'0'}}>
            <Menu theme="dark" mode="horizontal" style={{height: '100%'}}>
                <Link href="/" >
                    <p style={{ paddingLeft:'5%', color: 'white', fontSize: '1.7rem',margin: 'auto', marginLeft:'0'}}>Printer App</p>
                </Link>
            </Menu>
        </Header>
    )
}

export default Navbar;

