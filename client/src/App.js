import { Switch, Route } from "react-router-dom";
import About from "./pages/About";
import FilmPage from "./pages/FilmPage/FilmPage";
import FrontPage from "./pages/FrontPage/FrontPage";
import Page404 from "./pages/Page404/Page404";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={FrontPage} />
      <Route path="/reviews/:id" component={FilmPage} />
      <Route path="/about" component={About} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}

export default App;
