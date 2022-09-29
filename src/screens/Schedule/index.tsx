import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { format } from "date-fns";
import { Alert, StatusBar } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

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
import { Button } from "../../components/Button";
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from "../../components/Calendar";
import { getPlatformDate } from "../../utils/getPlataformDate";
import { CarDTO } from "../../dtos/CarDTO";

export interface RentalPeriodData {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Schedule() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodData>(
    {} as RentalPeriodData
  );

  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const route = useRoute();

  const { car } = route.params as Params;

  function handleConfirmSchedule() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert("Selecione o intervalo para alugar");
    } else {
      navigation.navigate("ScheduleDetails", {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  function handleGoBackScreen() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;

    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);

    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];

    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: start.timestamp,
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      end: end.timestamp,
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
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
            <DateValueContainer selected={!!rentalPeriod.startFormatted}>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValueContainer selected={!!rentalPeriod.endFormatted}>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          enabled={!!rentalPeriod.endFormatted}
          title="Confirmar"
          onPress={handleConfirmSchedule}
        />
      </Footer>
    </Container>
  );
}
