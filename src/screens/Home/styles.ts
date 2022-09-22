import { Text, View } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.colors.background_primary};
`;

export const Title = styled(Text)`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
`;
