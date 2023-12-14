import React, { useEffect, useState } from "react";
import { useMain } from "../../context/main-context";
import { StyledTextEditor, fontFace } from "./StyledTextEditor";
import { createGlobalStyle } from "styled-components";
import { Button, Stack, Box, Tooltip } from "@mui/material";

const TextEditor = () => {
  const { selectedFontData, handleShowToast } = useMain();
  const [inputVal, setInputVal] = useState<string>("");

  const GlobalStyles = createGlobalStyle`
  ${fontFace}
  `;
  useEffect(() => {
    const localTextValue: string | null = localStorage.getItem("autosave-text");
    if (localTextValue !== null) {
      setInputVal(localTextValue);
    }
  }, []);

  const handleInputChange = (
    event?: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event) {
      setInputVal(event.target.value);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (inputVal) {
      timeoutId = setTimeout(() => {
        localStorage.setItem("autosave-text", inputVal);
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [inputVal]);

  const handleClear = () => {
    setInputVal("");
    handleShowToast(
      inputVal.length > 0 ? "Text Cleared!" : "Input is already Empty!"
    );
    localStorage.removeItem("autosave-text");
  };

  const handleSave = () => {
    handleShowToast("Changes Saved!");
    if (inputVal.length > 0) {
      localStorage.setItem("autosave-text", inputVal);
    }
  };

  return (
    <div>
      <GlobalStyles />
      <Box mx={5}>
        <StyledTextEditor
          value={inputVal}
          onChange={handleInputChange}
          name="text-input"
          id="text-input"
          cols={30}
          rows={13}
          placeholder="Type your text here"
          fontName={selectedFontData?.name}
          fontUrl={selectedFontData?.fontUrl}
          fontWeight={selectedFontData?.fontWeight}
          isItalic={selectedFontData?.isItalic}
        ></StyledTextEditor>

        <Stack my={2} justifyContent={"flex-end"} direction="row" spacing={3}>
          <Tooltip title="Clear Text">
            <Button
              sx={{ padding: "8px 2.8rem" }}
              color="success"
              size="medium"
              onClick={handleClear}
              variant="contained"
            >
              Clear
            </Button>
          </Tooltip>
          <Tooltip title="Save all changes">
            <Button
              sx={{ padding: "8px 2.8rem" }}
              color="success"
              size="medium"
              onClick={handleSave}
              variant="contained"
            >
              Save
            </Button>
          </Tooltip>
        </Stack>
      </Box>
    </div>
  );
};

export default TextEditor;
