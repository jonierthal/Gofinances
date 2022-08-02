import React from 'react';
import { Platform } from 'react-native'; 
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard } from '../Screens/Dashboard';
import { Register } from '../Screens/Register';


export function AppRoutes(){
    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false, //faz com que o cabaçalho não apareça
                tabBarActiveTintColor: theme.colors.secondary, // altera a cor do menu ativo
                tabBarInactiveTintColor: theme.colors.text, // altera a cor do menu ativodos menus que não estão ativos
                tabBarLabelPosition: 'beside-icon', //posiciona o icone ao lado do texto
                tabBarStyle: {
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0, //validação para aplicad padding vertical apenas no sistema IOS

                }
            }}
        >
            <Screen
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ size, color }) => 
                    <MaterialIcons
                       name="format-list-bulleted"
                       size={size} 
                       color={color}
                    />
                    )
                }}
            />
            <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: (({ size, color }) => 
                    <MaterialIcons
                       name="attach-money"
                       size={size} 
                       color={color}
                    />
                    )
                }}
            />
            <Screen
                name="Resumo"
                component={Register}
                options={{
                    tabBarIcon: (({ size, color }) => 
                    <MaterialIcons
                       name="pie-chart"
                       size={size} 
                       color={color}
                    />
                    )
                }}
            />
        </Navigator>
    )
}