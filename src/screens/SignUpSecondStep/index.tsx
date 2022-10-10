import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useState } from "react";
import api from "../../services/api";
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
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

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const theme = useTheme();
  const route = useRoute();

  const { user } = route.params as Params;
  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirmation) {
      return Alert.alert("Informe a senha e a confirmação");
    }

    if (password !== passwordConfirmation) {
      return Alert.alert("As senhas não são iguais");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        password,
        driver_license: user.driverLicense,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreenRoute: "SignIn",
          title: "Conta criada!",
          message: `Agora é só fazer o login\n e aproveitar.`,
        });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Ocorreu um erro", "Não foi possível realizar o cadastro");
      });
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
              <Bullet active={false} />
              <Bullet active={true} />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"}conta</Title>
          <Subtitle>
            Faça seu cadastro de{"\n"}
            forma rapida e fácil
          </Subtitle>

          <Form>
            <FormTitle>Senha</FormTitle>
            <Input
              iconName="lock"
              placeholder="senha"
              autoCapitalize={"none"}
              autoCorrect={false}
              onChangeText={setPassword}
              value={password}
            />
            <Input
              iconName="lock"
              placeholder="repetir senha"
              autoCapitalize={"none"}
              autoCorrect={false}
              onChangeText={setPasswordConfirmation}
              value={passwordConfirmation}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
