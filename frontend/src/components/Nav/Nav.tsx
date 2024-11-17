import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export default function Nav(){
    const location = useLocation();
    return <>
        <nav className="p-4">
            <ul className="flex gap-4">
                <li>
                    <Link to={"/"} className={cn("hover:border-b-2", {
                        "font-bold": location.pathname === "/"
                    })}>Home</Link>
                </li>
                <li>
                    <Link to={"/info"} className={cn("hover:border-b-2", {
                        "font-bold" : location.pathname === "/info"
                    })}>Info</Link>
                </li>
            </ul>
        </nav>
        </>
}