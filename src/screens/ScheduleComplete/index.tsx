import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import { Container, Content, Footer, Message, Title } from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { ConfirmButton } from "../../components/ConfirmButton";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

export function ScheduleComplete() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const { width } = useWindowDimensions();

  function handleConfirmScheduleComplete() {
    navigation.navigate("Home");
  }

  return (
    <Container>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar seu automóvel
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirmScheduleComplete} />
      </Footer>
    </Container>
  );
}
