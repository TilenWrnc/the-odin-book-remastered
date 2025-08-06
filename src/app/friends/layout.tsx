"use client";

import Footer from "../dashboard/(components)/footer";
import MiniNavbar from "../dashboard/(components)/mini-nav-bar";
import NavBar from "../dashboard/(components)/nav-bar";


const FriendsLayout = ({
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
 
export default FriendsLayout;
