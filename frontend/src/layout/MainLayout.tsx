import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import Welcome from "../pages/Welcome";
import Footer from "../components/Footer";
import { useCookies } from "react-cookie";

const MainLayout = () => {
  const [cookies] = useCookies(['visited'])



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {cookies.visited ? (
        <main>
          <Navbar />
          <Outlet />
          <Footer />
        </main>
      ) : <Welcome />}

    </>
  )
}

export default MainLayout