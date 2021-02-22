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
import CheckYourEmailPage from "./pages/CheckYourEmailPage";
import Footer from "./components/Footer";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {
  const { user, status } = useContext(GhibliContext);
  return (
    <div className="flex-col ">
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
        <Route path="/profile">
          {status.isLoggedIn ? <ProfilePage /> : <Redirect to="/" />}
        </Route>
        <Route path="/result" component={CheckYourEmailPage} />
        <Route path="/verifyEmail">
          {status.isLoggedIn ? <VerifyEmailPage /> : <Redirect to="/" />}
        </Route>
        <Route path="*" component={Page404} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
