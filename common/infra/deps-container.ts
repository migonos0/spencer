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
import {asFunction} from 'awilix';
import {createTypedContainer} from './awilix';
import {Dependencies} from './dependencies';

export const makeDepsContainer = () => {
    const container = createTypedContainer<Dependencies>({strict: true});

    // Transactions
    // Repos
    container.register({
        transactionsRepo: asFunction(makeDrizzleTransactionsRepo).singleton(),
    });
    // Use cases
    container.register({
        createTransactionUseCase: asFunction(makeCreateTransactionUseCase),
        findAllTransactionsUseCase: asFunction(makeFindAllTransactionsUseCase),
        deleteTransactionUseCase: asFunction(makeDeleteTransactionUseCase),
        findBalanceUseCase: asFunction(makeFindBalanceUseCase),
        updateTransactionUseCase: asFunction(makeUpdateTransactionUseCase),
    });

    // Tags
    // Repos
    container.register({
        tagsRepo: asFunction(makeDrizzleTagsRepo).singleton(),
    });
    // Use cases
    container.register({
        createTagUseCase: asFunction(makeCreateTagUseCase),
        relateTagToTransactionUseCase: asFunction(
            makeRelateTagToTransactionUseCase,
        ),
        createTagsUseCase: asFunction(makeCreateTagsUseCase),
        relateTagsToTransactionUseCase: asFunction(
            makeRelateTagsToTransactionUseCase,
        ),
        findTagsByValueOrCreateUseCase: asFunction(
            makeFindTagsByValueOrCreateUseCase,
        ),
        unrelateTagToTransactionUseCase: asFunction(
            makeUnrelateTagToTransactionUseCase,
        ),
        unrelateTagsToTransactionUseCase: asFunction(
            makeUnrelateTagsToTransactionUseCase,
        ),
    });

    return container;
};
