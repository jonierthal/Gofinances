import React, {useState} from 'react';
import { 
    Modal, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert 
} from 'react-native';
import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation,
    NavigationProp,
    ParamListBase } from '@react-navigation/native';

import  { InputForm } from '../../Components2/Forms/InputForm';
import { Button } from '../../Components2/Forms/Button';
import { TransactionTypeButton } from '../../Components2/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../Components2/Forms/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';

interface FormData{
    [name: string]: any;
}

const schema = Yup.object().shape({
    name: Yup
    .string()
    .required('Nome é obrigatório'),
    amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
});

export function Register(){
    const [transactionType, setTransactionType] = useState(''); 
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const { navigate }: NavigationProp<ParamListBase> = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionsTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type);
    }
    
    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }
    

    async function handleRegister(form: FormData){
        if(!transactionType)
            return Alert.alert('Selecione o tipo de transação');

        if(category.key === 'category')
            return Alert.alert('Selecione a categoria')


        const newTransaction = {
            id: String(uuid.v4()), //utilizado biblicoteca uuid para gerar o id aleatorio
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const dataKey = '@gofinances:transactions';

            const data = await AsyncStorage.getItem(dataKey); // pega os dados atuais
            const currentData = data ? JSON.parse(data) : []; //caso tenha algo no data transorma em jSON, se não tiver retorna um array vazio
            
            const dataFormatted = [
                ...currentData,
                newTransaction
            ]; // junta os dados já cadastradas com os da nova transação

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted)); // guarda os dados setados no dataFormated
        
            reset(); // reseta os campos do form
            setTransactionType(''); //limpando setTransactionType
            setCategory({
                key: 'category', //limpando key
                name: 'Categoria', //limpando name
            })

            navigate('Listagem');

        } catch (error){
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
    }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form> 
                <Fields>
                    <InputForm
                        name="name"
                        control={control}
                        placeholder="Nome"
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        error={errors.name && errors.name.message}
                    />
                    <InputForm
                        name="amount"
                        control={control}
                        placeholder="Preço"
                        keyboardType="numeric"
                        error={errors.amount && errors.amount.message}

                    />
                    <TransactionsTypes>
                        <TransactionTypeButton
                            type="up"
                            title="Income"
                            onPress={() => handleTransactionsTypeSelect('positive')}
                            isActive={transactionType === 'positive'}
                        />
                        <TransactionTypeButton
                            type="down"
                            title="Outcome"
                            onPress={() => handleTransactionsTypeSelect('negative')}
                            isActive={transactionType === 'negative'}
                        />
                    </TransactionsTypes>
                    <CategorySelectButton 
                        title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>

                <Button 
                    title="Enviar"
                    onPress={handleSubmit(handleRegister)}
                />
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    </TouchableWithoutFeedback>
    );
}