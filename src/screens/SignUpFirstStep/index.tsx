import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Keyboard, KeyboardAvoidingView, StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { BackButton } from "../../components/BackButton";
import { Bullet } from "../../components/Bullet";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  Subtitle,
  Title,
} from "./styles";

export function SignUpFirstStep() {
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleNext() {
    navigation.navigate("");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle={"dark-content"}
            backgroundColor={"transparent"}
            translucent
          />
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active={true} />
              <Bullet active={false} />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <Subtitle>
            Faça seu cadastro de{"\n"}
            forma rapida e fácil
          </Subtitle>

          <Form>
            <FormTitle>Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="usuário"
              autoCapitalize={"none"}
              autoCorrect={false}
            />
            <Input
              iconName="mail"
              placeholder="e-mail"
              keyboardType="email-address"
              autoCapitalize={"none"}
              autoCorrect={false}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="number-pad"
              autoCorrect={false}
            />
          </Form>

          <Button title="Próximo" onPress={handleNext} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
