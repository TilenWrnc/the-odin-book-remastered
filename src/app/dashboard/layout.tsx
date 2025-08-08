import Footer from "./(components)/footer";
import MiniNavbar from "./(components)/mini-nav-bar";
import NavBar from "./(components)/nav-bar";

const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <div className="relative">
            <NavBar /> 
            <MiniNavbar /> 
            {children}
            <Footer/>
        </div>
     );
}
 
export default DashboardLayout;
