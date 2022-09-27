import { Text, View } from "react-native";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(View)`
  height: 92px;
  width: 109px;
  padding: 16px;
  margin-bottom: 8px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Name = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(12)}px;
`;
