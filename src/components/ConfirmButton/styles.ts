import { Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components";

export const Container = styled(RectButton)`
  width: 80px;
  height: 56px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.shape_dark};
`;

export const Title = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
`;
