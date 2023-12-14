import React from "react";
import FontFilters from "../../components/FontFilters/FontFilters";
import TextEditor from "../../components/TextEditor/TextEditor";
import { Box } from "@mui/material";

const RichEditor = () => {
  return (
    <Box>
      <FontFilters />
      <TextEditor />
    </Box>
  );
};

export default RichEditor;
