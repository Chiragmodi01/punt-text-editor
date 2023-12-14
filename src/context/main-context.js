import { createContext, useContext, useEffect, useState } from "react";
import data from "../data.json";

const MainContext = createContext();

// interface IFontData {
//   [key: string]: {
//     [key: string]: string;
//   };
// }

// interface ISelectedFontData {
//   name: string;
//   fontUrl: string;
//   isItalic: boolean;
//   fontWeight: number;
// }

function MainProvider({ children }) {
  const [fontsData, setFontsData] = useState(data);
  const [selectedFontData, setSelectedFontData] = useState({
    name: "",
    fontUrl: "",
    isItalic: false,
    fontWeight: "",
  });
  const [showToast, setShowToast] = useState({
    status: true,
    message: "",
  });
  const handleShowToast = (message) => {
    setShowToast({
      status: true,
      message,
    });
  };

  useEffect(() => {
    const localSelectedFontsData = JSON.parse(
      localStorage.getItem("selectedFontData")
    );
    const localAutosavedText = JSON.stringify(
      localStorage.getItem("autosave-text")
    );
    (localAutosavedText || localSelectedFontsData) &&
      handleShowToast("Previous Changes Retrieved!");
    localSelectedFontsData && setSelectedFontData(localSelectedFontsData);
  }, []);

  useEffect(() => {
    selectedFontData.name.length > 0 &&
      localStorage.setItem(
        "selectedFontData",
        JSON.stringify(selectedFontData)
      );
    console.log("fontsData", selectedFontData);
  }, [selectedFontData]);

  return (
    <MainContext.Provider
      value={{
        fontsData,
        setFontsData,
        selectedFontData,
        setSelectedFontData,
        showToast,
        setShowToast,
        handleShowToast,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

const useMain = () => useContext(MainContext);

export { MainProvider, useMain };
