import styled, { css } from "styled-components";

interface StyledTextEditorProps {
  fontName?: string;
  fontUrl?: string;
  fontWeight?: string | number;
  isItalic?: boolean;
}

const StyledTextEditor = styled.textarea<StyledTextEditorProps>`
  resize: none;
  width: 100%;
  border-radius: 6px;
  background: rgb(255 255 255 / 40%);
  font-size: 1rem;
  padding: 10px;
  box-sizing: border-box;
  font-family: ${(props) => props.fontName || "inherit"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  font-style: ${(props) => (props.isItalic ? "italic" : "normal")};
`;

StyledTextEditor.defaultProps = {
  fontName: "inherit",
  fontWeight: "normal",
  isItalic: false,
};

const fontFace = css<StyledTextEditorProps>`
  @font-face {
    font-family: ${(props) => props.fontName};
    src: url(${(props) => props.fontUrl}) format("woff2");
  }
`;

export { StyledTextEditor, fontFace };
