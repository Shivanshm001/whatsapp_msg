import { Nav } from "@/components/Nav";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return <>
        <Nav />
        <Outlet />
        <Toaster />
    </>
}