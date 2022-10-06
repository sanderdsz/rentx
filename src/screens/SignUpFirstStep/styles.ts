import { Text, View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components";

export const Container = styled(View)`
  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled(View)`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 32}px;

  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

export const Steps = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled(Text)`
  margin-top: 60px;
  margin-bottom: 16px;

  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.title};
`;

export const Subtitle = styled(Text)`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  line-height: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Form = styled(View)`
  width: 100%;
  margin-top: 64px;
  margin-bottom: 24px;
`;

export const FormTitle = styled(Text)`
  margin-bottom: 24px;

  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.title};
`;
