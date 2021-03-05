import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    Home,
    Splash
} from './screens';
import { Button, Icon } from 'react-native-elements';
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                        headerShown: false
                    }}
                    name="SplashScreen" component={Splash} />
                <Stack.Screen
                    options={{
                        headerTitle: "Blog Post",

                    }}


                    name="HomeScreen" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}