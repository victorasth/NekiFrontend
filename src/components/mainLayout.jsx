import "./mainLayout.css"
import LogoHeader from './../assets/LogoHeader.png'

const MainLayout = ({ children }) => {

    return (
        <div className="layout">
            <header className="header">
                <img className="logoHeader" src={LogoHeader} alt="Logo header" />
                {/* <h1 className="pageTitle">{pageTitle}</h1> */}
            </header>

            <main className="main">{children}</main>
            
            <footer className="footer">
                <p>Desafio Neki 2023.01</p>
            </footer>
        </div>
    );
};

export default MainLayout;