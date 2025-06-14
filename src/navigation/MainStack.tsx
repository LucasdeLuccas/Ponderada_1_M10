import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '@/constants';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { AddProductScreen } from '../screens/AddProductScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { Icon } from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type MainTabParamList = {
  [ROUTES.MAIN.HOME]: undefined;
  [ROUTES.MAIN.PRODUCT_DETAILS]: { productId: string };
  [ROUTES.MAIN.ADD_PRODUCT]: undefined;
  [ROUTES.MAIN.PROFILE]: undefined;
  [ROUTES.MAIN.NOTIFICATIONS]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export type MainStackParamList = {
  Home: undefined;
  ProductDetails: { productId: string };
  AddProduct: undefined;
  Profile: undefined;
  Notifications: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStack() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.MAIN.HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case ROUTES.MAIN.HOME:
              return <Icon name="home" type="material" color={color} size={size} />;
            case ROUTES.MAIN.ADD_PRODUCT:
              return <Icon name="add-box" type="material" color={color} size={size} />;
            case ROUTES.MAIN.PROFILE:
              return <Icon name="person" type="material" color={color} size={size} />;
            case ROUTES.MAIN.NOTIFICATIONS:
              return <Icon name="notifications" type="material" color={color} size={size} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name={ROUTES.MAIN.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.MAIN.ADD_PRODUCT} component={AddProductScreen} />
      <Tab.Screen name={ROUTES.MAIN.PROFILE} component={ProfileScreen} />
      <Tab.Screen name={ROUTES.MAIN.NOTIFICATIONS} component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

export const MainStackNative = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};
