"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

const MiniNavbar = () => {
    return ( 
        <div className="flex justify-around p-5 mx-auto mt-5 mb-10 bg-[#f9f9f9] w-[80vw] lg:w-[45vw] rounded-xl shadow-lg">
            <Link href="/dashboard">
                <Button variant="link" className="text-sm md:text-xl font-bold hover:text-black/60">
                    Posts
                </Button>
            </Link>
            <Link href="/friends" >
                <Button variant="link" className="text-sm md:text-xl font-bold hover:text-black/60">
                    Friends
                </Button>
            </Link>
        </div>
     );
}
 
export default MiniNavbar;