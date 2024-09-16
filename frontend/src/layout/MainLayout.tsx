import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import Welcome from "../pages/Welcome";
import Footer from "../components/Footer";

const MainLayout = () => {




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



      <Welcome />

      <main>
        <Navbar />
        <Outlet />
        <Footer />
      </main>

    </>
  )
}

export default MainLayout