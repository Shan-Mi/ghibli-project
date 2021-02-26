import React, { useContext } from "react";
import { GhibliContext } from "./context/GlobalContext";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FrontPage from "./pages/FrontPage";
import FilmPage from "./pages/FilmPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Page404 from "./pages/Page404";
import About from "./pages/About";
import ResetPage from "./pages/ResetPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CheckYourEmailPage from "./pages/CheckYourEmailPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import AdminEditFilmPage from "./pages/AdminEditFilmPage";
import AdminPage from "./pages/AdminPage";
import AdminFilmsPage from "./pages/AdminFilmsPage";
import AdminReviewsPage from "./pages/AdminReviewsPage";
import AdminEditReviewPage from "./pages/AdminEditReviewPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminCreateFilmPage from "./pages/AdminCreateFilmPage";

function App() {
  const { user, status } = useContext(GhibliContext);

  return (
    <div className="flex-col">
      <Header />
      <Switch>
        <Route path="/" exact component={FrontPage} />
        <Route path="/about" component={About} />
        <Route path="/films/:id" exact component={FilmPage} />

        <Route exact path="/login">
          {Object.keys(user).length ? <Redirect to="/" /> : <LoginPage />}
        </Route>

        <Route path="/register" component={RegisterPage} />
        <Route path="/resetPassword/:token" component={ResetPasswordPage} />
        <Route path="/sendResetPassword" component={ResetPage} />
        <Route
          path="/profile"
          render={() =>
            status.isLoggedIn === true ? <ProfilePage /> : <Redirect to="/" />
          }
        />

        <Route path="/result" exact component={CheckYourEmailPage} />
        <Route path="/verifyEmail" exact component={VerifyEmailPage} />

        <Route path="/admin" exact component={AdminPage} />
        <Route path="/admin/films" exact component={AdminFilmsPage} />
        <Route
          path="/admin/films/:id/edit"
          exact
          component={AdminEditFilmPage}
        />
        <Route
          path="/admin/films/create"
          exact
          component={AdminCreateFilmPage}
        />
        <Route path="/admin/reviews" exact component={AdminReviewsPage} />
        <Route
          path="/admin/reviews/:id/edit"
          exact
          component={AdminEditReviewPage}
        />
        <Route path="/admin/users" exact component={AdminUsersPage} />
        <Route path="*" component={Page404} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
