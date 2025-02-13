import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/login/page.jsx";
import LandingPage from "./page/LandingPage.jsx";
import PersonalAIPage from "./page/PersonalAIPage.jsx";
import RegisterPage from "./page/register/page.jsx";
import DealsPage from "./page/DealsPage.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<LandingPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/register'} element={<RegisterPage/>}/>
            {/*<Route path={'/forgot-password'}/>*/}
            <Route path={'/personalAI'} element={<PersonalAIPage/>}/>
            <Route path={'/deals'} element={<DealsPage/>}/>
        </Routes>
      </BrowserRouter>
      );
}
export default App;
