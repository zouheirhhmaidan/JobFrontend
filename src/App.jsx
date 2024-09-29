import { useState } from "react";

import "./App.css";
import JobsList from "./Views/Main/JobsList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <JobsList />
    </div>
  );
}

export default App;
