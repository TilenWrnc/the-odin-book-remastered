"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MiniNavbar = () => {
    const pathname = usePathname();

    return ( 
        <div className="flex justify-around p-5 mx-auto mt-5 mb-10 bg-[#f9f9f9] w-[80vw] lg:w-[45vw] rounded-xl shadow-lg">
            <Link href="/dashboard">
                <Button variant="link" className={`text-sm md:text-xl hover:text-black/60 ${pathname === "/dashboard" ? "font-bold underline" : ""}`}>
                    Posts
                </Button>
            </Link>
            <Link href="/friends" >
                <Button variant="link" className={`text-sm md:text-xl hover:text-black/60 ${pathname === "/friends" ? "font-bold underline" : ""}`}> 
                    Friends
                </Button>
            </Link>
            <Link href="/messages" >
                <Button variant="link" className={`text-sm md:text-xl hover:text-black/60 ${pathname === "/messages" ? "font-bold underline" : ""}`}>
                    Messages
                </Button>
            </Link>
        </div>
     );
}
 
export default MiniNavbar;