import {makeDrizzleTagsRepo} from '@/features/tags/common/infra/drizzle.tags-repo';
import {makeCreateTagUseCase} from '@/features/tags/features/create-tag/create-tag.use-case';
import {makeCreateTagsUseCase} from '@/features/tags/features/create-tags/create-tags.use-case';
import {makeFindTagsByValueOrCreateUseCase} from '@/features/tags/features/find-tags-by-value-or-create/find-tags-by-value-or-create.use-case';
import {makeRelateTagToTransactionUseCase} from '@/features/tags/features/relate-tag-to-transaction/relate-tag-to-transaction.use-case';
import {makeRelateTagsToTransactionUseCase} from '@/features/tags/features/relate-tags-to-transaction/relate-tags-to-transaction.use-case';
import {makeUnrelateTagToTransactionUseCase} from '@/features/tags/features/unrelate-tag-to-transaction/unrelate-tag-to-transaction.use-case';
import {makeUnrelateTagsToTransactionUseCase} from '@/features/tags/features/unrelate-tags-to-transaction/unrelate-tags-to-transaction.use-case';
import {makeDrizzleTransactionsRepo} from '@/features/transactions/common/infra/drizzle.transactions-repo';
import {makeCreateTransactionUseCase} from '@/features/transactions/features/create-transaction/create-transaction.use-case';
import {makeDeleteTransactionUseCase} from '@/features/transactions/features/delete-transaction/delete-transaction.use-case';
import {makeFindAllTransactionsUseCase} from '@/features/transactions/features/find-all-transactions/find-all-transactions.use-case';
import {makeFindBalanceUseCase} from '@/features/transactions/features/find-balance/find-balance.use-case';
import {makeUpdateTransactionUseCase} from '@/features/transactions/features/update-transaction/update-transaction.use-case';
import {asFunction, createContainer} from 'awilix';

const depNames = {
    // Transactions
    // Repos
    TRANSACTIONS_REPO: 'transactionsRepo',
    // Use cases
    CREATE_TRANSACTION_USE_CASE: 'createTransactionUseCase',
    FIND_ALL_TRANSACTIONS_USE_CASE: 'findAllTransactionsUseCase',
    DELETE_TRANSACTION_USE_CASE: 'deleteTransactionUseCase',
    FIND_BALANCE_USE_CASE: 'findBalanceUseCase',
    UPDATE_TRANSACTION_USE_CASE: 'updateTransactionUseCase',

    // Tags
    // Repos
    TAGS_REPO: 'tagsRepo',
    // Use cases
    CREATE_TAG_USE_CASE: 'createTagUseCase',
    RELATE_TAG_TO_TRANSACTION_USE_CASE: 'relateTagToTransactionUseCase',
    CREATE_TAGS_USE_CASE: 'createTagsUseCase',
    RELATE_TAGS_TO_TRANSACTION_USE_CASE: 'relateTagsToTransactionUseCase',
    FIND_TAGS_BY_VALUE_OR_CREATE_USE_CASE: 'findTagsByValueOrCreateUseCase',
    UNRELATE_TAG_TO_TRANSACTION_USE_CASE: 'unrelateTagToTransactionUseCase',
    UNRELATE_TAGS_TO_TRANSACTION_USE_CASE: 'unrelateTagsToTransactionUseCase',
} as const;
export type DepNames = (typeof depNames)[keyof typeof depNames];

export const makeDepsContainer = () => {
    const container = createContainer({strict: true});

    // Transactions
    // Repos
    container.register({
        [depNames.TRANSACTIONS_REPO]: asFunction(
            makeDrizzleTransactionsRepo,
        ).singleton(),
    });
    // Use cases
    container.register({
        [depNames.CREATE_TRANSACTION_USE_CASE]: asFunction(
            makeCreateTransactionUseCase,
        ),
        [depNames.FIND_ALL_TRANSACTIONS_USE_CASE]: asFunction(
            makeFindAllTransactionsUseCase,
        ),
        [depNames.DELETE_TRANSACTION_USE_CASE]: asFunction(
            makeDeleteTransactionUseCase,
        ),
        [depNames.FIND_BALANCE_USE_CASE]: asFunction(makeFindBalanceUseCase),
        [depNames.UPDATE_TRANSACTION_USE_CASE]: asFunction(
            makeUpdateTransactionUseCase,
        ),
    });

    // Tags
    // Repos
    container.register({
        [depNames.TAGS_REPO]: asFunction(makeDrizzleTagsRepo).singleton(),
    });
    // Use cases
    container.register({
        [depNames.CREATE_TAG_USE_CASE]: asFunction(makeCreateTagUseCase),
        [depNames.RELATE_TAG_TO_TRANSACTION_USE_CASE]: asFunction(
            makeRelateTagToTransactionUseCase,
        ),
        [depNames.CREATE_TAGS_USE_CASE]: asFunction(makeCreateTagsUseCase),
        [depNames.RELATE_TAGS_TO_TRANSACTION_USE_CASE]: asFunction(
            makeRelateTagsToTransactionUseCase,
        ),
        [depNames.FIND_TAGS_BY_VALUE_OR_CREATE_USE_CASE]: asFunction(
            makeFindTagsByValueOrCreateUseCase,
        ),
        [depNames.UNRELATE_TAG_TO_TRANSACTION_USE_CASE]: asFunction(
            makeUnrelateTagToTransactionUseCase,
        ),
        [depNames.UNRELATE_TAGS_TO_TRANSACTION_USE_CASE]: asFunction(
            makeUnrelateTagsToTransactionUseCase,
        ),
    });

    return container;
};
