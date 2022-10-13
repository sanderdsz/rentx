import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import {
  Container,
  Content,
  Header,
  HeaderTitle,
  HeaderTop,
  LogoutButton,
  Option,
  Options,
  OptionTitle,
  Photo,
  PhotoButton,
  PhotoContainer,
  Section,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { Input } from "../../components/Input";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/auth";
import { Button } from "../../components/Button";
import * as Yup from "yup";

export function Profile() {
  const { user, signOut, updateUser } = useAuth();

  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setdriverLicense] = useState(user.driver_license);

  const theme = useTheme();

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleOptionChange(optionSelected: "dataEdit" | "passwordEdit") {
    setOption(optionSelected);
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleUpdateUser() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatória"),
        name: Yup.string().required("Nome é obrigatório"),
      });

      const data = { name, driverLicense };

      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        name,
        driver_license: driverLicense,
        email: user.email,
        avatar,
        token: user.token,
      });

      Alert.alert("Sucesso!", "Perfil atualizado.");
    } catch (error) {
      console.log(error);

      if (error instanceof Yup.ValidationError) {
        console.log(error.message);

        Alert.alert("Ocorreu um erro!", error.message);
      }
      Alert.alert("Ocorreu um erro!", "Não foi possível atualizar o perfil.");
    }
  }

  async function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      `Se você sair, irá precisar\nconectar-se novamente.`,
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => signOut(),
          style: "default",
        },
      ]
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === "dataEdit" ? true : false}
                onPress={() => handleOptionChange("dataEdit")}
              >
                <OptionTitle active={option === "dataEdit" ? true : false}>
                  Dados
                </OptionTitle>
              </Option>
              <Option
                active={option === "passwordEdit" ? true : false}
                onPress={() => handleOptionChange("passwordEdit")}
              >
                <OptionTitle active={option === "passwordEdit" ? true : false}>
                  Trocar Senha
                </OptionTitle>
              </Option>
            </Options>

            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="nome"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={name}
                  onChangeText={setName}
                  defaultValue={user.name}
                />

                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />

                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  value={driverLicense}
                  onChangeText={setdriverLicense}
                  defaultValue={user.driver_license}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput
                  iconName="lock"
                  placeholder="senha atual"
                  autoCorrect={false}
                  autoCapitalize="none"
                />

                <PasswordInput
                  iconName="lock"
                  placeholder="nova senha"
                  autoCorrect={false}
                  autoCapitalize="none"
                />

                <PasswordInput
                  iconName="lock"
                  placeholder="repetir senha"
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </Section>
            )}

            <Button title="Salvar Alterações" onPress={handleUpdateUser} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
