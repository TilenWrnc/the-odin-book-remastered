import { Button } from "@/components/ui/button";
import Logo from "./logo";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const NavBarMarketing = () => {
    return ( 
        <nav className="bg-[#f9f9f9] p-4 flex justify-around border-b shadow-lg">
            <Logo/>
            <div className="flex gap-x-5">
                <Button size="sm" variant="ghost" className="border-2 " asChild>
                    <Link href="/sign-in">
                        Sign In
                    </Link>
                </Button>
                <Button size="sm" asChild>
                    <Link href="/sign-up">
                        Sign Up
                    </Link>
                </Button>
            </div>
        </nav>
     );
}
 
export default NavBarMarketing;