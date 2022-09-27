import { FlatList, FlatListProps, Text, View } from "react-native";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { CarDTO } from "../../dtos/CarDTO";

export const Container = styled(View)`
  flex: 1;

  background: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled(View)`
  width: 100%;
  height: 113px;
  padding: 32px 24px;

  justify-content: flex-end;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderContent = styled(View)`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const TotalCars = styled(Text)`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const Price = styled(Text)``;

export const CarList = styled(
  FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>
)``;
