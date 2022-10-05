import React, { useState } from "react";
import { Container, IconContainer, InputText } from "./styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function Input({ iconName, value, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);

    if (value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }

  const theme = useTheme();

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          size={24}
          name={iconName}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>

      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </Container>
  );
}
