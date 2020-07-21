import { Column } from './column.filter';

export interface Tab {
  name: string;
  tableName: string;
  columns: Column[];
}
