import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "@/constants";
import { LoginScreen } from "@/screens/LoginScreen";
import { RegisterScreen } from "@/screens/RegisterScreen";
import { ForgotPasswordScreen } from "@/screens/ForgotPasswordScreen";
import { ResetPasswordScreen } from "@/screens/ResetPasswordScreen";

export type AuthStackParamList = {
  [ROUTES.AUTH.LOGIN]: undefined;
  [ROUTES.AUTH.REGISTER]: undefined;
  [ROUTES.AUTH.FORGOT_PASSWORD]: undefined;
  [ROUTES.AUTH.RESET_PASSWORD]: { email: string };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.AUTH.LOGIN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ROUTES.AUTH.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.AUTH.REGISTER} component={RegisterScreen} />
      <Stack.Screen
        name={ROUTES.AUTH.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={ROUTES.AUTH.RESET_PASSWORD}
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
}
