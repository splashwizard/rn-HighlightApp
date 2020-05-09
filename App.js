import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Import Page
import Login from './src/screens/Login';
import Home from './src/screens/Home';

//Import Redux
import { Provider } from 'react-redux';
import store from './store'

const Stack = createStackNavigator();

class App extends Component {
    state = {}
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{
                            headerShown: false,
                            headerStyle: {
                                backgroundColor: '#f4511e',
                            }
                        }}
                    >
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Home" component={Home} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}

export default App;