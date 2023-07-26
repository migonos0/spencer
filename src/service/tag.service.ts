import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {TAGS_TABLE_NAME} from '../constants/db';
import {Tag} from '../schemas/tag.schema';
import {getInsertId, getInsertIds, validateRowAffectation} from '../lib/sqlite';

export const createTagsTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${TAGS_TABLE_NAME}(
          name TEXT NOT NULL UNIQUE
      );`;

  await db.executeSql(query);
};

export const findAllTags = async (db: SQLiteDatabase) => {
  const tags: Tag[] = [];
  const results = await db.executeSql(
    `SELECT rowid as id, name FROM ${TAGS_TABLE_NAME}`,
  );
  results.forEach(result => {
    for (let index = 0; index < result.rows.length; index++) {
      tags.push(result.rows.item(index));
    }
  });
  return tags;
};

export const createTag =
  (tagName: Tag['name']) => async (db: SQLiteDatabase) => {
    const insertQuery = `INSERT OR REPLACE INTO 
    ${TAGS_TABLE_NAME}(name) values ( 
    '${tagName}')`;

    const result = await db.executeSql(insertQuery);

    return {id: getInsertId(result), name: tagName};
  };

export const createTags =
  (tagNames: Tag['name'][]) => async (db: SQLiteDatabase) => {
    const insertQuery = `INSERT OR REPLACE INTO 
    ${TAGS_TABLE_NAME}(name) values ${tagNames
      .map(tagName => `('${tagName}')`)
      .join(',')}`;
    console.log(insertQuery);

    const result = await db.executeSql(insertQuery);

    console.log(result);
    console.log(getInsertIds(result));

    return getInsertIds(result);
  };

export const deleteTag = (id: number) => async (db: SQLiteDatabase) => {
  const deleteQuery = `DELETE from ${TAGS_TABLE_NAME} where rowid = ${id}`;
  const response = await db.executeSql(deleteQuery);
  validateRowAffectation(response);

  return id;
};

export const dropTagsTable = async (db: SQLiteDatabase) => {
  const query = `DROP TABLE ${TAGS_TABLE_NAME}`;

  await db.executeSql(query);
};