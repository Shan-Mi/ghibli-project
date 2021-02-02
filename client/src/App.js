import { Switch, Route } from "react-router-dom";
import About from "./pages/About";
import FilmPage from "./pages/FilmPage/FilmPage";
import FrontPage from "./pages/FrontPage/FrontPage";
import Page404 from "./pages/Page404/Page404";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={FrontPage} />
        <Route path="/films/:id" component={FilmPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/about" component={About} />
        <Route path="*" component={Page404} />
      </Switch>
    </>
  );
}

export default App;
