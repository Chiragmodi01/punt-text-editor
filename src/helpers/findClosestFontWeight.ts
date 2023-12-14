export function findClosestFontWeight(fontWeight: string, fontWeightsArr: any) {
  const isSelectedFontItalic = fontWeight.includes("italic");
  const numericWeight = Number(fontWeight.replace(/[^0-9]/g, "").trim());

  const italicVariants = fontWeightsArr.filter((fw: string) =>
    fw.includes("italic")
  );
  const nonitalicVariants = fontWeightsArr.filter(
    (fw: string) => !fw.includes("italic")
  );

  const isArrItalic =
    isSelectedFontItalic && italicVariants.length > 0 ? true : false;

  const closestFontWeight = (
    isSelectedFontItalic && italicVariants.length > 0
      ? italicVariants
      : nonitalicVariants.length > 0
      ? nonitalicVariants
      : italicVariants
  ).reduce((prev: string, curr: string) => {
    const prevNumericWeight = prev.includes("italic")
      ? Number(prev.replace(/[^0-9]/g, "").trim())
      : Number(prev);

    const currNumeric = Number(curr.replace("italic", " "));

    return Math.abs(currNumeric - numericWeight) <
      Math.abs(prevNumericWeight - numericWeight)
      ? curr
      : prev;
  });
  return { isArrItalic, closestFontWeight };
}
