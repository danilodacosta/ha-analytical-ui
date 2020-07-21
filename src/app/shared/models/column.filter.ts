import { Condition } from './condition.model';

export interface Column {
  name: string;
  type?: string;
  conditions: Condition[];
}
