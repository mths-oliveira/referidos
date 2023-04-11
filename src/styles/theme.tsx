import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  semanticTokens: {
    colors: {},
  },
  fonts: {
    mono: `'Menlo', monospace`,
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  breakpoints: {
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
  },
})
