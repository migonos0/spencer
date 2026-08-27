import {useDependency} from '@/common/hooks/use-dependency';
import {useQuery} from '@tanstack/react-query';
import {queryKeys} from '@/common/constants/query-keys';

export const useTransactions = () => {
    const findAllTransactionsUseCase = useDependency(
        'findAllTransactionsUseCase',
    );

    const {data} = useQuery({
        queryKey: queryKeys.transactions,
        queryFn: findAllTransactionsUseCase.execute,
    });

    return {transactions: data};
};
