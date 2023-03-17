import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/User";
import Users from "./components/Users";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Users} />
          <Route path="/user/:id" Component={User} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
