import React, { useState } from "react";
import "./App.css";
import RichEditor from "./screens/RichEditor/RichEditor";
import { Alert, Snackbar } from "@mui/material";
import { useMain } from "./context/main-context";

function App() {
  const { showToast, setShowToast } = useMain();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowToast({
      status: false,
      message: "",
    });
  };
  return (
    <div className="App">
      <Snackbar
        open={showToast.status && showToast.message.length > 0}
        autoHideDuration={2500}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {showToast.message}
        </Alert>
      </Snackbar>
      <RichEditor />
    </div>
  );
}

export default App;
