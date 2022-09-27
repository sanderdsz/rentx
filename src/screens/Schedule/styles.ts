import { ScrollView, Text, TextProps, View } from "react-native";
import styled, { css } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

interface DateValueProps extends TextProps {
  selected: boolean;
}

export const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled(View)`
  width: 100%;
  height: 325px;
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 30}px;

  justify-content: center;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const Title = styled(Text)`
  margin-top: 24px;

  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(34)}px;
`;

export const RentalPeriod = styled(View)`
  width: 100%;
  margin: 32px 0;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DateInfo = styled(View)`
  width: 30%;
`;

export const DateTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const DateValueContainer = styled(View)<DateValueProps>`
  ${({ selected, theme }) =>
    !selected &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.text};
      padding-bottom: 5px;
    `}
`;

export const DateValue = styled(Text)`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

export const Content = styled(ScrollView)``;

export const Footer = styled(View)`
  padding: 24px;
`;
