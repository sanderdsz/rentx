import { Image, Text, TouchableOpacity, View } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components";

interface OptionProps {
  active: boolean;
}

export const Container = styled(View)`
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled(View)`
  width: 100%;
  height: 227px;
  padding: 0 24px;

  align-items: center;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderTop = styled(View)`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 32}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled(Text)`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.background_secondary};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled(View)`
  width: 180px;
  height: 180px;
  margin-top: 48px;

  border-radius: 90px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Photo = styled(Image)`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 10px;
  right: 10px;

  border-radius: 20px;

  background-color: ${({ theme }) => theme.colors.main};
`;

export const Content = styled(View)`
  padding: 0 24px;
  margin-top: 122px;
`;

export const Options = styled(View)`
  margin-bottom: 24px;

  flex-direction: row;
  justify-content: space-around;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const Option = styled(TouchableOpacity)<OptionProps>`
  padding-bottom: 14px;

  ${({ active }) =>
    active
      ? css`
          border-bottom-width: 3px;
          border-bottom-color: ${({ theme }) => theme.colors.main};
        `
      : null}
`;

export const OptionTitle = styled(Text)<OptionProps>`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme, active }) =>
    active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
  color: ${({ theme, active }) =>
    active ? theme.colors.header : theme.colors.text_detail};
`;

export const Section = styled(View)``;
