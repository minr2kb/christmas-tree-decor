import { defineRecipe } from "@chakra-ui/react"

export const inputAddonRecipe = defineRecipe({
  className: "chakra-input-addon",
  base: {
    flex: "0 0 auto",
    width: "auto",
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
  variants: {
    size: {
      "2xs": {
        textStyle: "xs",
        px: "2",
        "--input-height": "sizes.7",
      },
      xs: {
        textStyle: "xs",
        px: "2",
        "--input-height": "sizes.8",
      },
      sm: {
        textStyle: "sm",
        px: "2.5",
        "--input-height": "sizes.9",
      },
      md: {
        textStyle: "sm",
        px: "3",
        "--input-height": "sizes.10",
      },
      lg: {
        textStyle: "md",
        px: "4",
        "--input-height": "sizes.11",
      },
      xl: {
        textStyle: "md",
        px: "4.5",
        "--input-height": "sizes.12",
      },
      "2xl": {
        textStyle: "lg",
        px: "5",
        "--input-height": "sizes.16",
      },
    },
    variant: {
      outline: {
        border: "1px solid",
        borderColor: {
          _light: "border",
          _dark: "whiteAlpha.50",
        },
        bg: "bg.muted",
      },
      subtle: {
        border: "2px solid",
        borderColor: "transparent",
        bg: {
          _light: "gray.100",
          _dark: "whiteAlpha.50",
        },
      },
      flushed: {
        borderBottom: "1px solid",
        borderColor: "inherit",
        borderRadius: "0",
        px: "0",
        bg: "transparent",
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
})
