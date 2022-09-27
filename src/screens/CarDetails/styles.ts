import { View, Text, ScrollView } from "react-native";
import styled from "styled-components";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
`;

export const CarImages = styled(View)`
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Content = styled(ScrollView)``;

export const Details = styled(View)`
  width: 100%;
  margin-top: 38px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Description = styled(View)``;

export const Brand = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Name = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(25)}px;
  text-transform: uppercase;
`;

export const Rent = styled(View)``;

export const Period = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Price = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.main};
  font-size: ${RFValue(25)}px;
`;

export const About = styled(Text)`
  margin-top: 23px;

  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;
  text-align: justify;
  line-height: 25px;
`;

export const Accessories = styled(View)`
  width: 100%;
  margin-top: 16px;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const Footer = styled(View)`
  width: 100%;
  padding: 24px 24px;

  padding-bottom: ${getBottomSpace() + 24}px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;
