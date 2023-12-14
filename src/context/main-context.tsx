import { createContext, useContext, useEffect, useState } from "react";
import data from "../data.json";
import { IFontData, ISelectedFontData, IMainContext } from "../Interfaces";

const MainContext = createContext<IMainContext | undefined>(undefined);

function MainProvider({ children }: { children: React.ReactNode }) {
  const [fontsData, setFontsData] = useState<IFontData>(data);
  const [selectedFontData, setSelectedFontData] = useState<ISelectedFontData>({
    name: "",
    fontUrl: "",
    isItalic: false,
    fontWeight: "",
  });
  const [showToast, setShowToast] = useState({
    status: true,
    message: "",
  });
  const handleShowToast = (message: string) => {
    setShowToast({
      status: true,
      message,
    });
  };

  useEffect(() => {
    const localSelectedFontsData = JSON.parse(
      localStorage.getItem("selectedFontData") || "null"
    );
    const localAutosavedText = localStorage.getItem("autosave-text");
    if (localAutosavedText || localSelectedFontsData) {
      handleShowToast("Previous Changes Retrieved!");
    }
    localSelectedFontsData && setSelectedFontData(localSelectedFontsData);
  }, []);

  useEffect(() => {
    selectedFontData.name.length > 0 &&
      localStorage.setItem(
        "selectedFontData",
        JSON.stringify(selectedFontData)
      );
  }, [selectedFontData]);

  const contextValue: IMainContext = {
    fontsData,
    setFontsData,
    selectedFontData,
    setSelectedFontData,
    showToast,
    setShowToast,
    handleShowToast,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
}

const useMain = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMain must be used within a MainProvider");
  }
  return context;
};

export { MainProvider, useMain };
