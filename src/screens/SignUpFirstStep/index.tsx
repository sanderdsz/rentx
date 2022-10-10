import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Yup from "yup";
import { BackButton } from "../../components/BackButton";
import { Bullet } from "../../components/Bullet";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/auth";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  function handleBack() {
    navigation.navigate("SignIn");
  }

  async function handleNext() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório"),
        email: Yup.string().required("E-mail é obrigatório"),
        driverLicense: Yup.string().required("CNH é obrigatória"),
      });

      const data = { name, email, driverLicense };

      await schema.validate(data);

      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Ocorreu um erro", error.message);
      }
    }
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
              value={name}
              onChangeText={setName}
            />
            <Input
              iconName="mail"
              placeholder="e-mail"
              keyboardType="email-address"
              autoCapitalize={"none"}
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="number-pad"
              autoCorrect={false}
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
          </Form>

          <Button title="Próximo" onPress={handleNext} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
