import { Route, Routes } from "react-router-dom";
import { Home } from "@/components/Home";
import { RootLayout } from "./layouts/RootLayout";

export default function App() {
  return <>
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Home />} />
      </Route>
    </Routes>
  </>
}