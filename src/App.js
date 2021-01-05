import "./App.css";
import Form from "./Form";
import Game from "./Game";
import { useGlobalContext } from "./context";
import Loading from "./Loading";
import AdminPanel from "./AdminPanel";

function App() {
  const {
    admin,
    player: { isLoggedIn },
    errorP,
    errorQ,
    errorN,
    loadingP,
    loadingQ,
    loadingN,
  } = useGlobalContext();

  if (loadingP || loadingQ || loadingN) {
    return <Loading />;
  }
  if (errorP || errorQ || errorN) {
    return <div>{errorP || errorQ || errorN}</div>;
  }
  if (admin) {
    return <AdminPanel />;
  }
  if (true) {
    return <Game />;
  } else {
    return <Form />;
  }
}

export default App;
