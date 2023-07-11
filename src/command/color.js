const foregroundColors = {
    black: '0;30',
    dark_gray: '1;30',
    blue: '0;34',
    light_blue: '1;34',
    green: '0;32',
    light_green: '1;32',
    cyan: '0;36',
    light_cyan: '1;36',
    red: '0;31',
    light_red: '1;31',
    purple: '0;35',
    light_purple: '1;35',
    brown: '0;33',
    yellow: '1;33',
    light_gray: '0;37',
    white: '1;37'
  };
  
  const backgroundColors = {
    black: '40',
    red: '41',
    green: '42',
    yellow: '43',
    blue: '44',
    magenta: '45',
    cyan: '46',
    light_gray: '47'
  };
  
  function getColoredString(string, foregroundColor = null, backgroundColor = null) {
    let coloredString = "";
  
    // Check if given foreground color found
    if (foregroundColor && foregroundColors[foregroundColor]) {
      coloredString += `\x1b[${foregroundColors[foregroundColor]}m`;
    }
    // Check if given background color found
    if (backgroundColor && backgroundColors[backgroundColor]) {
      coloredString += `\x1b[${backgroundColors[backgroundColor]}m`;
    }
  
    // Add string and end coloring
    coloredString += string + "\x1b[0m";
  
    return coloredString;
  }
  
  function getForegroundColors() {
    return Object.keys(foregroundColors);
  }
  
  function getBackgroundColors() {
    return Object.keys(backgroundColors);
  }
  
  export { getColoredString, getForegroundColors, getBackgroundColors };
  