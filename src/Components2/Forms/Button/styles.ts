import styled from 'styled-components/native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps extends RectButtonProps{
    children: React.ReactNode;
}

export const Container = styled(RectButton)<ButtonProps>`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 18px;

    border-radius: 5px;
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;

    color: ${({ theme }) => theme.colors.shape};

`;