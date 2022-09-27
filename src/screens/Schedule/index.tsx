import React from "react";
import { useTheme } from "styled-components";

import { BackButton } from "../../components/BackButton";
import {
  Container,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  DateValueContainer,
  Footer,
  Header,
  RentalPeriod,
  Title,
} from "./styles";

import ArrowSvg from "../../assets/arrow.svg";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

export function Schedule() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const theme = useTheme();

  function handleConfirmSchedule() {
    navigation.navigate("ScheduleDetails");
  }

  function handleGoBackScreen() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleGoBackScreen} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}data de início e {"\n"}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueContainer selected={true}>
              <DateValue>18/06/2022</DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValueContainer selected={false}>
              <DateValue></DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmSchedule} />
      </Footer>
    </Container>
  );
}
