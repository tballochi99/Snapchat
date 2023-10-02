import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './components/context/AuthContext';
import { ImageProvider } from './components/context/ImageContext';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import UserList from './components/snaps/UserList';
import CameraScreen from './components/screens/CameraScreen';
import SnapList from './components/snaps/SnapList';
import ProfileScreen from './components/Users/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <ImageProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="SnapList" component={SnapList} />
            <Stack.Screen name="UserList" component={UserList} />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageProvider>
    </AuthProvider>
  );
};

export default App;
