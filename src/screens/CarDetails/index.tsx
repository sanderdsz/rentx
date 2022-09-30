import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import {
  About,
  Accessories,
  AnimatedCarImages,
  AnimatedContent,
  AnimatedHeaderAndSlider,
  Brand,
  CarImages,
  Container,
  Content,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
} from "./styles";
import { Button } from "../../components/Button";

import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryItem";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const statusBarHeight = getStatusBarHeight();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    console.log(event.contentOffset.y);
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, statusBarHeight + 50],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  const route = useRoute();

  const { car } = route.params as Params;

  function handleConfirmDetail() {
    navigation.navigate("Schedule", { car });
  }

  function handleGoBackScreen() {
    navigation.goBack();
  }

  useEffect(() => {});

  return (
    <Container>
      <AnimatedHeaderAndSlider style={headerStyleAnimation}>
        <Header>
          <BackButton onPress={handleGoBackScreen} />
        </Header>

        <AnimatedCarImages style={sliderCarsStyleAnimation}>
          <ImageSlider imagesUrl={car.photos} />
        </AnimatedCarImages>
      </AnimatedHeaderAndSlider>

      <AnimatedContent onScroll={scrollHandler} scrollEventThrottle={16}>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ ${car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </AnimatedContent>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmDetail} />
      </Footer>
    </Container>
  );
}
