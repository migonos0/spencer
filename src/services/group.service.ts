import {number, safeParse} from 'valibot';
import {GroupDto} from '../dtos/group.dto';
import {Group, GroupInput} from '../entities/group';
import {dataSource} from '../utilities/data-source';

export const createGroup = async (input: GroupInput) =>
  await dataSource.manager.save(new Group({...input}));

export const findBalanceByGroupId = async (groupId: Group['id']) => {
  const {balance} = await dataSource
    .createQueryBuilder()
    .from(Group, 'group')
    .innerJoin('group.accounts', 'account')
    .innerJoin('account.transactions', 'transaction')
    .where('group.id = :groupId', {groupId})
    .select('SUM(transaction.amount)', 'balance')
    .getRawOne();

  const parsedBalance = safeParse(number(), balance);

  if (!parsedBalance.success) {
    return;
  }

  return parsedBalance.output;
};

export const findAllGroups = async () =>
  await dataSource.manager.find(Group, {
    order: {updatedAt: 'desc'},
    relations: {accounts: true},
  });

export const findAllGroupDtos = async () =>
  Promise.all((await findAllGroups()).map(group => GroupDto.build(group)));

export const deleteGroup = async (group: GroupInput) => {
  const modifiedGroup = await dataSource.manager.save(
    new Group({
      ...group,
      accounts: [],
    }),
  );
  return await dataSource.manager.remove(modifiedGroup);
};
