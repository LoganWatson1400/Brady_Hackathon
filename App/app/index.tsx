
import React, { useEffect } from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Home from '@/screens/Home'
import Info from '@/screens/Info';
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
                <Burger.Screen name='Home' options={{drawerIcon: ({color, size}) => (<Ionicons name='home' color={color} size={size}/>)}} component={Home} />
                <Burger.Screen name='Info' options={{drawerIcon: ({color, size}) => (<Ionicons name='book' color={color} size={size}/>)}} component={Info} />
                <Burger.Screen name='Settings' options={{drawerIcon: ({color, size}) => (<Ionicons name='settings' color={color} size={size}/>)}} component={Settings} />
            </Burger.Navigator>
    );
}
