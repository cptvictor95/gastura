import { extendTheme } from "@chakra-ui/react";

const gasturaTheme = extendTheme({
  styles: {
    global: {
      body: {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
    },
  },
  colors: {
    green: {
      900: "#1a3c3d",
    },
    darkgreen: {
      800: "#0a191a;",
    },
  },
  components: {
    Button: {
      baseStyle: {
        textColor: "white",
      },
      variants: {
        link: {
          color: "gray.100",
        },
        solid: {
          _hover: {
            filter: "auto",
            brightness: "80%",
          },
          width: "100%",
          height: "9",
          color: "black",
          bgColor: "white",
        },
        headerBtn: {
          _hover: {
            filter: "auto",
            brightness: "80%",
          },
          width: "32",
          height: "9",
          bgColor: "transparent",
        },
      },
    },
  },
});

export default gasturaTheme;

/*// main
$primary-color: #acd1af;
$primary-color-dark: #1a3c3d;

// accent/error
$accent-color: #ffee32; // ou fdc500
$primary-text-color: #d90429;

// neutral
$primary-bg-color: #0a191a;
$primary-text-color: #fffaec;
$gray-color: #b8bacf;
*/
