
import React, { useEffect } from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Home from '@/screens/Home'
import Info from '@/screens/Info';
import Review from '@/screens/Review';
import Settings from '@/screens/Settings';
import {Ionicons} from '@expo/vector-icons';

const Burger = createDrawerNavigator();

export default function App() {
    return (
            <Burger.Navigator
                screenOptions={{
                    drawerIcon: ({ focused, size}) => (<Ionicons name='menu' size={size} color={focused ? '#7cc' : '#ccc'}/>),
                }}
            >
                <Burger.Screen name='Home' component={Home} />
                <Burger.Screen name='Info' component={Info} />
                <Burger.Screen name='Review' component={Review} />
                <Burger.Screen name='Profiles' component={Settings} />
            </Burger.Navigator>
    );
}
