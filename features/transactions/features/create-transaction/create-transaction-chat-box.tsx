import {ChatButtonBox} from '@/common/components/chat-button-box';
import {useCreateTransaction} from './use-create-transaction';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {findTransactionValuesFromMessage} from '@/common/utilities/transaction-pattern-finders';
import {useBalance} from '../find-balance/use-balance';
import {Transaction} from '../../domain/transaction';
import {FC} from 'react';

type CreateTransactionChatBoxProps = {
    sendButtonLabel: string;
};

export const CreateTransactionChatBox: FC<CreateTransactionChatBoxProps> = ({
    sendButtonLabel,
}) => {
    const {createTransaction} = useCreateTransaction();
    const {control, handleSubmit, setValue} = useForm<{message: string}>();
    const {addTransaction} = useBalance();

    const handleOnCreateTransactionSuccess = (transaction: Transaction) => {
        setValue('message', '');
        addTransaction(transaction);
    };

    const messageSubmitHandler: SubmitHandler<{message: string}> = ({
        message,
    }) => {
        const transactionValues = findTransactionValuesFromMessage(message);
        createTransaction(
            {
                isExpense: transactionValues.isExpense,
                description: transactionValues.description,
                amount: transactionValues.amount,
            },
            {onSuccess: handleOnCreateTransactionSuccess},
        );
    };

    return (
        <Controller
            control={control}
            name="message"
            rules={{required: true, minLength: 1}}
            render={({field: {onChange, value}}) => (
                <ChatButtonBox
                    sendButtonLabel={sendButtonLabel}
                    value={value}
                    onChangeText={onChange}
                    onSendButtonPress={handleSubmit(messageSubmitHandler)}
                />
            )}
        />
    );
};
