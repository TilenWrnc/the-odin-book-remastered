import Logo from "@/app/(components)/logo";

const Footer = () => {
    return ( 
        <footer className="bg-[#f9f9f9] flex justify-around fixed bottom-0 w-full"   style={{ boxShadow: "0 -4px 6px rgba(0,0,0,0.1)" }}>
            <Logo/>
        </footer>
    );
}
 
export default Footer;