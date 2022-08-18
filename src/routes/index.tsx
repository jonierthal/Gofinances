import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

import { useAuth } from '../hooks/auth';

export function Routes(){

    const { user } = useAuth();

    return (
        <NavigationContainer>
                {user.id ? <AppRoutes/> : <AuthRoutes />//se o usuário estiver logado direciona para appRoutes se não estiver direciona para AuthRoutes
                } 
        </NavigationContainer> 
    )
}