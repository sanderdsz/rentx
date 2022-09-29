import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { AntDesign } from "@expo/vector-icons";

import { CarDTO } from "../../dtos/CarDTO";
import {
  AppointmentQuantity,
  Appointments,
  AppointmentTitle,
  CarFooter,
  CarFooterDate,
  CarFooterPeriod,
  CarFooterTitle,
  CarWrapper,
  Container,
  Content,
  Header,
  SubTitle,
  Title,
} from "./styles";
import { StatusBar, FlatList } from "react-native";
import { Load } from "../../components/Load";
import { BackButton } from "../../components/BackButton";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { Car } from "../../components/Car";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  endDate: string;
  startDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const navigation = useNavigation();

  function handleGoBackScreen() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/schedules_byuser?user_id=${1}`);

        setCars(response.data);

        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <Container>
      {loading === true ? (
        <Load />
      ) : (
        <>
          <Header>
            <StatusBar
              barStyle="light-content"
              translucent
              backgroundColor="transparent"
            />
            <BackButton
              onPress={handleGoBackScreen}
              color={theme.colors.shape}
            />

            <Title>
              Escolha uma {`\n`}data de início e {`\n`}fim do aluguel
            </Title>
            <SubTitle>Conforto, segurança e praticidade.</SubTitle>
          </Header>

          <Content>
            <Appointments>
              <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
              <AppointmentQuantity>{cars.length}</AppointmentQuantity>
            </Appointments>

            <FlatList
              data={cars}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          </Content>
        </>
      )}
    </Container>
  );
}
