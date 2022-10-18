import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Tab1 } from './Tab1';
import { Tab2Screen } from './Tab2';

const Tab = createBottomTabNavigator();


export const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#5856D6',
                tabBarLabelStyle: {
                    marginBottom: (Platform.OS === 'ios') ? 0 : 10
                },
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    borderWidth: 0,
                    elevation: 0,
                    height: (Platform.OS === 'ios')? 80: 60
                }
            }}
            sceneContainerStyle={{
                backgroundColor: 'white'
            }}

        >
            <Tab.Screen
                name="Home"
                component={Tab1}
                options={{
                    tabBarLabel: "List",
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            size={25}
                            name="list-outline"
                        />
                    )
                }}
            />
            <Tab.Screen
                name="SearchScreen"
                component={Tab2Screen}
                options={{
                    tabBarLabel: "Search",
                    tabBarIcon: ({ color }) => (
                        <Icon
                            color={color}
                            size={25}
                            name="search-outline"
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}