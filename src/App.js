import ProfilePage from "./Pages/ProfilePage";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import 'react-toastify/dist/ReactToastify.css';
import {db} from "./firebase/Firebase"
import Header from "./Components/Header";
function App() {
  return (
    <Router>
        <Header/>
      <Routes>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>

        <Route path="/forgot-password" element={<ForgotPassword />}/>
      </Routes>
    </Router>
  );
}

export default App;
