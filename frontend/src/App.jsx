import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import AddDetailsScreen from "./Screens/AddDetailsScreen";
import AptitudeScreen from "./Screens/AptitudeScreen";
import FeedbackScreen from "./Screens/FeedbackScreen";

function App() {
  return (
    <>
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
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/add-details" element={<AddDetailsScreen />} />
        <Route path="/aptitude" element={<AptitudeScreen/>}/>
        <Route path="/feedback" element={<FeedbackScreen/>}/>
      </Routes>
    </>
  );
}

export default App;
