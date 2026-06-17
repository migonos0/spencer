import {useLocalSearchParams} from 'expo-router';
import {FlatList, View} from 'react-native';
import {TransactionCard} from '@/common/components/transaction-card';
import {useNavigateToTag} from '@/features/tags/common/hooks/use-navigate-to-tag';
import {useTransactions} from '@/features/transactions/features/find-all-transactions/use-transactions';
import {useContext, useEffect, useMemo} from 'react';
import {AppBarContext} from '../_layout';
import {useTheme} from 'react-native-paper';

export default function TagTransactionsScreen() {
    const {id: tagId} = useLocalSearchParams<{id: string}>();
    const {navigateToTag} = useNavigateToTag();
    const {transactions} = useTransactions();
    const {colors} = useTheme();
    const appbarContext = useContext(AppBarContext);

    const filteredTransactions = useMemo(() => {
        if (!transactions || !tagId) {
            return [];
        }
        return transactions.filter((transaction) =>
            transaction.tags?.some((tag) => tag.id.toString() === tagId),
        );
    }, [transactions, tagId]);
    const tagName = useMemo(
        () =>
            filteredTransactions
                .at(0)
                ?.tags?.find((tag) => tag.id.toString() === tagId)?.value ??
            'Tag',
        [filteredTransactions, tagId],
    );
    const balance = useMemo(
        () =>
            filteredTransactions.reduce(
                (balance, transaction) =>
                    balance +
                    transaction.amount * (transaction.isExpense ? -1 : 1),
                0,
            ),
        [filteredTransactions],
    );

    useEffect(() => {
        if (!appbarContext) return;
        appbarContext.setTitle(`${tagName}: ${balance}`);
    }, [appbarContext, tagName]);

    return (
        <View className="h-full px-4 pb-4">
            <FlatList
                inverted
                data={filteredTransactions}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item: transaction}) => (
                    <TransactionCard
                        class="my-2"
                        backgroundColor={
                            transaction.isExpense
                                ? colors.tertiaryContainer
                                : colors.surfaceVariant
                        }
                        title={
                            (transaction.isExpense ? '- ' : '+ ') +
                            transaction.amount.toString()
                        }
                        body={transaction.description}
                        tags={transaction.tags?.map((tag) => ({
                            label: tag.value,
                            onPress: () => navigateToTag(tag.id),
                        }))}
                    />
                )}
            />
        </View>
    );
}
