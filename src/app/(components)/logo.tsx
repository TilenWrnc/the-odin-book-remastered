const Logo = () => {
    return ( 
        <div className="flex invisible absolute md:relative md:visible">
            <img src="./logo.svg" alt="logo" width={90}/>
            <p className="font-bold text-xl flex self-center">The Odin Book</p>
        </div>
    );
}
 
export default Logo;