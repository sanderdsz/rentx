import React from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { Footer, Container, Header, Subtitle, Title, Form } from "./styles";

export function SignIn() {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView>
      <Container>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor="transparent"
          translucent
        />
        <Header>
          <Title>Estamos{"\n"}quase lá.</Title>
          <Subtitle>
            Faça seu login para começar{"\n"}uma experiência incrível.
          </Subtitle>
        </Header>

        <Form>
          <Input
            iconName="mail"
            placeholder="e-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <PasswordInput
            iconName="lock"
            placeholder="password"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Form>

        <Footer>
          <Button
            title="Login"
            onPress={() => {}}
            enabled={false}
            loading={false}
            color={theme.colors.main}
          />

          <Button
            title="Criar conta gratuita"
            onPress={() => {}}
            enabled={false}
            loading={false}
            color={theme.colors.background_secondary}
            light
          />
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  );
}