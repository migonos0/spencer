import {TransactionsRepo} from '@/features/transactions/common/infra/transactions-repo';
import {TagsRepo} from '@/features/tags/common/infra/tags-repo';
import {CreateTransactionUseCase} from '@/features/transactions/features/create-transaction/create-transaction.use-case';
import {FindAllTransactionsUseCase} from '@/features/transactions/features/find-all-transactions/find-all-transactions.use-case';
import {DeleteTransactionUseCase} from '@/features/transactions/features/delete-transaction/delete-transaction.use-case';
import {FindBalanceUseCase} from '@/features/transactions/features/find-balance/find-balance.use-case';
import {UpdateTransactionUseCase} from '@/features/transactions/features/update-transaction/update-transaction.use-case';
import {CreateTagUseCase} from '@/features/tags/features/create-tag/create-tag.use-case';
import {RelateTagToTransactionUseCase} from '@/features/tags/features/relate-tag-to-transaction/relate-tag-to-transaction.use-case';
import {CreateTagsUseCase} from '@/features/tags/features/create-tags/create-tags.use-case';
import {RelateTagsToTransactionUseCase} from '@/features/tags/features/relate-tags-to-transaction/relate-tags-to-transaction.use-case';
import {FindTagsByValueOrCreateUseCase} from '@/features/tags/features/find-tags-by-value-or-create/find-tags-by-value-or-create.use-case';
import {UnrelateTagToTransactionUseCase} from '@/features/tags/features/unrelate-tag-to-transaction/unrelate-tag-to-transaction.use-case';
import {UnrelateTagsToTransactionUseCase} from '@/features/tags/features/unrelate-tags-to-transaction/unrelate-tags-to-transaction.use-case';

export type Dependencies = {
    // Transactions
    // Repos
    transactionsRepo: TransactionsRepo;
    // Use cases
    createTransactionUseCase: CreateTransactionUseCase;
    findAllTransactionsUseCase: FindAllTransactionsUseCase;
    deleteTransactionUseCase: DeleteTransactionUseCase;
    findBalanceUseCase: FindBalanceUseCase;
    updateTransactionUseCase: UpdateTransactionUseCase;

    // Tags
    // Repos
    tagsRepo: TagsRepo;
    // Use cases
    createTagUseCase: CreateTagUseCase;
    relateTagToTransactionUseCase: RelateTagToTransactionUseCase;
    createTagsUseCase: CreateTagsUseCase;
    relateTagsToTransactionUseCase: RelateTagsToTransactionUseCase;
    findTagsByValueOrCreateUseCase: FindTagsByValueOrCreateUseCase;
    unrelateTagToTransactionUseCase: UnrelateTagToTransactionUseCase;
    unrelateTagsToTransactionUseCase: UnrelateTagsToTransactionUseCase;
};
