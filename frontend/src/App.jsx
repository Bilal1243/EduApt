import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
