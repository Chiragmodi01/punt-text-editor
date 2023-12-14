import React, { useEffect } from "react";
import { useMain } from "../../context/main-context";
import {
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Tooltip,
  Button,
} from "@mui/material";
import { StyledIOSSwitch } from "./StyledSwitch";
import { findClosestFontWeight } from "../../helpers/findClosestFontWeight";

const FontFilters = () => {
  const { handleShowToast, fontsData, selectedFontData, setSelectedFontData } =
    useMain();

  const handleFontFamilyChange = (e: SelectChangeEvent) => {
    const selectedFontFamily = e.target.value;
    const selectedFontWeights = fontsData[selectedFontFamily];
    const defaultFontWeight = Object.keys(selectedFontWeights)[0];

    const closestFontWeightOutput = findClosestFontWeight(
      JSON.stringify(selectedFontData.fontWeight),
      Object.keys(selectedFontWeights)
    );

    setSelectedFontData({
      name: selectedFontFamily,
      fontUrl: selectedFontWeights[defaultFontWeight],
      isItalic: closestFontWeightOutput.isArrItalic,
      fontWeight: closestFontWeightOutput.closestFontWeight,
    });
  };

  const handleFontWeightChange = (e: SelectChangeEvent) => {
    const selectedFontWeight = e.target.value;
    const isItalic = selectedFontWeight.includes("italic");

    setSelectedFontData({
      ...selectedFontData,
      isItalic,
      fontWeight: selectedFontWeight,
    });
  };

  const handleReset = () => {
    handleShowToast("Font Styles Resetted");
    setSelectedFontData({
      name: "",
      fontUrl: "",
      isItalic: false,
      fontWeight: "",
    });
    localStorage.removeItem("selectedFontData");
  };

  return (
    <Stack
      flexWrap="wrap"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={3}
      spacing={20}
      my={5}
      mx={5}
    >
      <Stack flex={1} spacing={5} direction="row" alignItems="center">
        <FormControl fullWidth>
          <InputLabel id="fontFamilySelect">Font Family</InputLabel>
          <Select
            labelId="fontFamilySelect"
            id="fontFamilySelect"
            value={selectedFontData.name}
            label="Font Family"
            onChange={handleFontFamilyChange}
          >
            {Object.keys(fontsData).map((fontFamily) => (
              <MenuItem key={fontFamily} value={fontFamily}>
                {fontFamily}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="fontWeightSelect">Font Weight</InputLabel>
          <Select
            labelId="fontWeightSelect"
            id="fontWeightSelect"
            value={
              selectedFontData.fontWeight === ""
                ? ""
                : selectedFontData.fontWeight
            }
            label="Font Weight"
            onChange={handleFontWeightChange}
          >
            {Object.keys(fontsData[selectedFontData.name] || {}).map(
              (fontWeight) => (
                <MenuItem key={fontWeight} value={fontWeight}>
                  {fontWeight && fontWeight.replace(/italic/g, " (Italic)")}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        <Stack>
          <InputLabel id="italicCheckbox">Italic</InputLabel>
          <StyledIOSSwitch
            id="italicCheckbox"
            checked={selectedFontData.isItalic}
            onChange={() =>
              setSelectedFontData({
                ...selectedFontData,
                isItalic: !selectedFontData.isItalic,
              })
            }
          />
        </Stack>
      </Stack>
      <Stack>
        <Tooltip title="Reset all Styles">
          <Button
            color="success"
            size="medium"
            onClick={handleReset}
            variant="outlined"
          >
            Reset
          </Button>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default FontFilters;
