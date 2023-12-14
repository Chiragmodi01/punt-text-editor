export interface IFontData {
  [key: string]: {
    [key: string]: string;
  };
}

export interface ISelectedFontData {
  name: string;
  fontUrl: string;
  isItalic: boolean;
  fontWeight: string;
}

export interface IMainContext {
  fontsData: IFontData;
  setFontsData: React.Dispatch<React.SetStateAction<IFontData>>;
  selectedFontData: ISelectedFontData;
  setSelectedFontData: React.Dispatch<React.SetStateAction<ISelectedFontData>>;
  showToast: { status: boolean; message: string };
  setShowToast: React.Dispatch<
    React.SetStateAction<{ status: boolean; message: string }>
  >;
  handleShowToast: (message: string) => void;
}

export interface IStyledTextEditorProps {
  fontName?: string;
  fontUrl?: string;
  fontWeight?: string | number;
  isItalic?: boolean;
}
