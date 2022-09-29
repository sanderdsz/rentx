import { Text, View } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components";

export const Container = styled(View)`
  flex: 1;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_primary};
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
  font-size: ${RFValue(30)}px;
`;

export const SubTitle = styled(Text)`
  margin-top: 24px;

  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;
`;

export const Content = styled(View)`
  width: 100%;
  padding: 0 16px;

  flex: 1;
`;

export const Appointments = styled(View)`
  width: 100%;
  padding: 24px 0;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AppointmentTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentQuantity = styled(Text)`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

export const CarWrapper = styled(View)`
  margin-bottom: 16px;
`;

export const CarFooter = styled(View)`
  width: 100%;
  padding: 12px;
  margin-top: -10px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const CarFooterTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CarFooterDate = styled(Text)`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(13)}px;
`;
