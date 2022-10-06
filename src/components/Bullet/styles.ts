import { View } from "react-native";
import styled from "styled-components";

interface Props {
  active?: boolean;
}

export const ImageInContainerdexes = styled(View)`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const Container = styled(View)<Props>`
  height: 6px;
  width: 6px;
  margin-left: 8px;

  border-radius: 3px;

  background-color: ${({ theme, active }) =>
    active === true ? theme.colors.title : theme.colors.shape};
`;
