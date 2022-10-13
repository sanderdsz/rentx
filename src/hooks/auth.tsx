import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { database } from "../databases";
import api from "../services/api";
import { User as UserModel } from "../databases/models/User";

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (crendentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token, user } = response.data;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await database.write(async () => {
        const userCollection = await database.get<UserModel>("users");

        await userCollection.create((newUser) => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.avatar = user.avatar;
          newUser.driver_license = user.drive_license;
          newUser.token = token;
        });
      });

      setData({ ...user, token });
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }

  async function signOut() {
    try {
      await database.write(async () => {
        const userCollection = await database.get<UserModel>("users");

        const userSelected = await userCollection.find(data.id);

        await userSelected.destroyPermanently();

        setData({} as User);
      });
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }

  async function updateUser(user: User) {
    console.log(user);

    try {
      await database.write(async () => {
        const userCollection = await database.get<UserModel>("users");

        const userSelected = await userCollection.find(data.id);

        await userSelected.update((userData) => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });

        setData(user);
      });
    } catch (error) {
      console.log(error);

      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<UserModel>("users");

      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.token}`;

        setData(userData);
      }
    }

    loadUserData();
  });

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
