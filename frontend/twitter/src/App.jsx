import React from "react";
import "./App.css";
import Body from "./components/Body";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="m-2">
      <Body />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1d98f0",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
