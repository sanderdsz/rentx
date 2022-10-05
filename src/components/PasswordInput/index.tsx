import React, { useState } from "react";
import { Container, IconContainer, InputText } from "./styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { TextInputProps } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const theme = useTheme();

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

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((previousState) => !previousState);
  }

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
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={
              isFocused || isFilled
                ? theme.colors.main
                : theme.colors.text_detail
            }
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
