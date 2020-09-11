var react = require('@stitches/react');

var scales = {
  $0: '0px',
  $1: '4x',
  $2: '8px',
  $3: '12px',
  $4: '16px',
  $5: '20px',
  $6: '24px',
  $8: '32px',
  $10: '40px',
  $12: '48px',
  $16: '64px',
  $20: '80px',
  $24: '96px',
  $32: '128px',
  $40: '160px',
  $48: '192px',
  $56: '224px',
  $64: '256px'
};
var theme = {
  colors: {
    $gray100: '#F7FAFC',
    $gray200: '#EDF2F7',
    $gray300: '#E2E8F0',
    $gray400: '#CBD5E0',
    $gray500: '#A0AEC0',
    $gray600: '#718096',
    $gray700: '#4A5568',
    $gray800: '#2D3748',
    $gray900: '#1A202C',
    $orange100: '#FFFAF0',
    $orange200: '#FEEBC8',
    $orange300: '#FBD38D',
    $orange400: '#F6AD55',
    $orange500: '#ED8936',
    $orange600: '#DD6B20',
    $orange700: '#C05621',
    $orange800: '#9C4221',
    $orange900: '#7B341E',
    $yellow100: '#FFFFF0',
    $yellow200: '#FEFCBF',
    $yellow300: '#FAF089',
    $yellow400: '#F6E05E',
    $yellow500: '#ECC94B',
    $yellow600: '#D69E2E',
    $yellow700: '#B7791F',
    $yellow800: '#975A16',
    $yellow900: '#744210',
    $red100: '#FFF5F5',
    $red200: '#FED7D7',
    $red300: '#FEB2B2',
    $red400: '#FC8181',
    $red500: '#F56565',
    $red600: '#E53E3E',
    $red700: '#C53030',
    $red800: '#9B2C2C',
    $red900: '#742A2A',
    $indigo100: '#EBF4FF',
    $indigo200: '#C3DAFE',
    $indigo300: '#A3BFFA',
    $indigo400: '#7F9CF5',
    $indigo500: '#667EEA',
    $indigo600: '#5A67D8',
    $indigo700: '#4C51BF',
    $indigo800: '#434190',
    $indigo900: '#3C366B',
    $blue100: '#EBF8FF',
    $blue200: '#BEE3F8',
    $blue300: '#90CDF4',
    $blue400: '#63B3ED',
    $blue500: '#4299E1',
    $blue600: '#3182CE',
    $blue700: '#2B6CB0',
    $blue800: '#2C5282',
    $blue900: '#2A4365'
  },
  fonts: {
    $default: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
    $mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;'
  },
  space: scales,
  sizes: scales,
  fontSizes: {
    $xs: '12px',
    $sm: '14px',
    $base: '16px',
    $lg: '18px',
    $xl: '20px',
    $2xl: '34px',
    $3xl: '30px',
    $4xl: '36px',
    $5xl: '48px',
    $6xl: '64px'
  },
  lineHeights: {
    $xs: '19.5px',
    $sm: '22.75px',
    $base: '26px',
    $lg: '29.25px',
    $xl: '32.5px',
    $2xl: '39px',
    $3xl: '48.75px',
    $4xl: '58.5px',
    $5xl: '78px',
    $6xl: '104px'
  },
  radii: {
    $0: '0',
    $sm: '2px',
    $md: '4px',
    $lg: '8px',
    $xl: '16px',
    $round: '50%',
    $pill: '9999px'
  },
  zIndices: {
    $1: '100',
    $2: '200',
    $3: '300',
    $4: '400',
    $max: '9999'
  }
};

var _createStyled = react.createStyled({
  tokens: theme,
  breakpoints: {
    tablet: function tablet(rule) {
      return "@media (min-width: 640px) { " + rule + " }";
    },
    laptop: function laptop(rule) {
      return "@media (min-width: 768px) { " + rule + " }";
    },
    desktop: function desktop(rule) {
      return "@media (min-width: 1024px) { " + rule + " }";
    },
    screen: function screen(rule) {
      return "@media (min-width: 1280px) { " + rule + " }";
    }
  },
  utils: {
    p: function p() {
      return function (value) {
        return {
          paddingTop: value,
          paddingBottom: value,
          paddingLeft: value,
          paddingRight: value
        };
      };
    },
    pt: function pt() {
      return function (value) {
        return {
          paddingTop: value
        };
      };
    },
    pr: function pr() {
      return function (value) {
        return {
          paddingRight: value
        };
      };
    },
    pb: function pb() {
      return function (value) {
        return {
          paddingBottom: value
        };
      };
    },
    pl: function pl() {
      return function (value) {
        return {
          paddingLeft: value
        };
      };
    },
    px: function px() {
      return function (value) {
        return {
          paddingLeft: value,
          paddingRight: value
        };
      };
    },
    py: function py() {
      return function (value) {
        return {
          paddingTop: value,
          paddingBottom: value
        };
      };
    },
    m: function m() {
      return function (value) {
        return {
          marginTop: value,
          marginBottom: value,
          marginLeft: value,
          marginRight: value
        };
      };
    },
    mt: function mt() {
      return function (value) {
        return {
          marginTop: value
        };
      };
    },
    mr: function mr() {
      return function (value) {
        return {
          marginRight: value
        };
      };
    },
    mb: function mb() {
      return function (value) {
        return {
          marginBottom: value
        };
      };
    },
    ml: function ml() {
      return function (value) {
        return {
          marginLeft: value
        };
      };
    },
    mx: function mx() {
      return function (value) {
        return {
          marginLeft: value,
          marginRight: value
        };
      };
    },
    my: function my() {
      return function (value) {
        return {
          marginTop: value,
          marginBottom: value
        };
      };
    },
    bg: function bg() {
      return function (value) {
        return {
          background: value
        };
      };
    },
    bc: function bc() {
      return function (value) {
        return {
          backgroundColor: value
        };
      };
    },
    br: function br() {
      return function (value) {
        return {
          borderRadius: value
        };
      };
    },
    font: function font() {
      return function (value) {
        return {
          fontSize: value,
          lineHeight: theme.lineHeights[value]
        };
      };
    },
    size: function size() {
      return function (value) {
        return {
          width: value,
          height: value
        };
      };
    }
  }
}),
    styled = _createStyled.styled,
    css = _createStyled.css;
css.global({
  'body': {
    margin: '0'
  },
  '*': {
    boxSizing: 'border-box'
  }
});

var Box = styled('div', {});

exports.Box = Box;
exports.css = css;
exports.styled = styled;
exports.theme = theme;
//# sourceMappingURL=index.js.map
