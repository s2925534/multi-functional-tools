declare function getColoredString(
    string: string,
    foregroundColor?: string | null,
    backgroundColor?: string | null
  ): string;
  
  declare function getForegroundColors(): string[];
  declare function getBackgroundColors(): string[];
  
  export { getColoredString, getForegroundColors, getBackgroundColors };
  