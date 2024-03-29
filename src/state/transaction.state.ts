import {swrKeyGetters} from '../utilities/swr-key-getters';
import {Transaction} from '../entities/transaction';
import {
  useSWRMutationOnInitializedDS,
  useSWRImmutableOnInitializedDS,
} from '../hooks/use-swr';
import {
  createTransaction,
  deleteTransactionById,
  findAllTransactionsByAccount,
} from '../services/transaction.service';
import {Account} from '../entities/account';
import {useSWRConfig} from 'swr';
import {AccountDto} from '../dtos/account.dto';
import {GroupDto} from '../dtos/group.dto';
import {useMemo} from 'react';

export const useTransactionsByAccount = (account?: Account) => {
  const key = account
    ? swrKeyGetters.getUseTransactionsByAccountKey(account)
    : undefined;
  const fetcher = account
    ? () => findAllTransactionsByAccount(account)
    : () => undefined;

  const {data} = useSWRImmutableOnInitializedDS(key, fetcher);

  return {transactions: data};
};

export const useDeleteTransactionByAccount = (account?: Account) => {
  const key = account
    ? swrKeyGetters.getUseTransactionsByAccountKey(account)
    : undefined;
  const {mutate} = useSWRConfig();
  const groupIds = useMemo(
    () => account?.groups?.map(group => group.id),
    [account],
  );

  const {trigger} = useSWRMutationOnInitializedDS(key, deleteTransactionById, {
    populateCache: (
      deletedTransaction,
      currentData: Transaction[] | undefined,
    ) => {
      if (!deletedTransaction) {
        return currentData;
      }

      /**
       * Decreasing to the balance of the account, removing and placing it on top.
       */
      mutate(
        swrKeyGetters.getUseAccountDtosKey(),
        (cachedAccountDtos: AccountDto[] | undefined) => {
          if (!cachedAccountDtos) {
            return;
          }
          return cachedAccountDtos.reduce(
            (accumulator: AccountDto[], accountDto) => {
              if (accountDto.id === deletedTransaction.account?.id) {
                return [
                  {
                    ...accountDto,
                    balance:
                      (accountDto.balance ?? 0) - deletedTransaction.amount,
                  },
                  ...accumulator,
                ];
              }
              return [...accumulator, accountDto];
            },
            [],
          );
        },
        {revalidate: false},
      );

      /**
       * Decreacing to the balance of the groups where the account is registered.
       */
      mutate(
        swrKeyGetters.getUseGroupDtosKey(),
        (cachedGroupDtos: GroupDto[] | undefined) => {
          if (!cachedGroupDtos) {
            return;
          }
          return cachedGroupDtos.reduce((accumulator: GroupDto[], groupDto) => {
            if (groupIds?.includes(groupDto.id)) {
              return [
                {
                  ...groupDto,
                  balance: (groupDto.balance ?? 0) - deletedTransaction.amount,
                },
                ...accumulator,
              ];
            }
            return [...accumulator, groupDto];
          }, []);
        },
        {revalidate: false},
      );

      return currentData?.filter(
        transaction => transaction.id !== deletedTransaction.id,
      );
    },
  });

  return {deleteTransactionTrigger: trigger};
};

export const useCreateTransactionByAccount = (account?: Account) => {
  const key = account
    ? swrKeyGetters.getUseTransactionsByAccountKey(account)
    : undefined;
  const {mutate} = useSWRConfig();
  const groupIds = useMemo(
    () => account?.groups?.map(group => group.id),
    [account],
  );

  const {trigger} = useSWRMutationOnInitializedDS(key, createTransaction, {
    populateCache: (
      createdTransaction,
      currentData: Transaction[] | undefined,
    ) => {
      if (!createdTransaction) {
        return currentData;
      }

      /**
       * Adding to the balance of the account, removing and placing it on top.
       */
      mutate(
        swrKeyGetters.getUseAccountDtosKey(),
        (cachedAccountDtos: AccountDto[] | undefined) => {
          if (!cachedAccountDtos) {
            return;
          }
          return cachedAccountDtos.reduce(
            (accumulator: AccountDto[], account2) => {
              if (account2.id === createdTransaction.account?.id) {
                return [
                  {
                    ...account2,
                    balance:
                      (account2.balance ?? 0) + createdTransaction.amount,
                  },
                  ...accumulator,
                ];
              }
              return [...accumulator, account2];
            },
            [],
          );
        },
        {revalidate: false},
      );

      /**
       * Adding to the balance of the groups where the account is registered
       */
      mutate(
        swrKeyGetters.getUseGroupDtosKey(),
        (cachedGroupDtos: GroupDto[] | undefined) => {
          if (!cachedGroupDtos) {
            return;
          }
          return cachedGroupDtos.reduce((accumulator: GroupDto[], group) => {
            if (groupIds?.includes(group.id)) {
              return [
                {
                  ...group,
                  balance: (group.balance ?? 0) + createdTransaction.amount,
                },
                ...accumulator,
              ];
            }
            return [...accumulator, group];
          }, []);
        },
        {revalidate: false},
      );

      return [createdTransaction, ...(currentData ?? [])];
    },
  });

  return {createTransactionTrigger: trigger};
};
