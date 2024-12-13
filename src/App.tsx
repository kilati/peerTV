// deno-lint-ignore-file
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Error from "./pages/Error.tsx";
import Home from "./pages/Home.tsx";


function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, location.search]);

  return (
    <>
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<Error />} />
    </Routes>

    </>
  );
}
export default App;
 