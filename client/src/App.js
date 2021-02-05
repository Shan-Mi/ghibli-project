import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import FrontPage from "./pages/FrontPage";
import FilmPage from "./pages/FilmPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Page404 from "./pages/Page404";
import About from "./pages/About";
import ResetPage from "./pages/ResetPage";
import { GhibliContext } from "./context/GlobalContext";
import { useContext } from "react";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// import axios from 'axios'
// import { URL } from "./constants";
// axios.defaults.withCredentials = true

// URL

// const createCookie = () => {
//   axios.get('http://localhost:4000',{ withCredentials: true }).then((res) =>{
//     console.log(res.data)
//   })
// }
// const deleteCookie = () => {
//   axios.get('http://localhost:4000/deleteCookie',{ withCredentials: true }).then((res) =>{
//     console.log(res.data)
//   })
// }
function App() {
  const { user } = useContext(GhibliContext);
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={FrontPage} />
        <Route path="/about" component={About} />
        <Route path="/films/:id" component={FilmPage} />

        <Route exact path="/login">
          {Object.keys(user).length ? <Redirect to="/" /> : <LoginPage />}
        </Route>

        <Route path="/register" component={RegisterPage} />
        <Route path="/resetPassword/:token" component={ResetPasswordPage} />
        <Route path="/sendResetPassword" component={ResetPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="*" component={Page404} />
      </Switch>
    </>
  );
}

export default App;
