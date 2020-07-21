import { Condition } from './../shared/models/condition.model';
import { StorageService } from './storage.service';
import { map, timeout, catchError } from 'rxjs/operators';
import { Column } from './../shared/models/column.filter';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BootService {

  private baseUrl = 'http://www.mscfilho.net:8088/api/v1';

  constructor(private http: HttpClient, private storageService: StorageService) { }

  public getResultDadosCadastrais(tableName: string, columns: Column[]): Observable<any> {


    const config = {
      headers: {
        Authorization: 'Bearer ' + this.storageService.getLocalToken(),
        'Content-Type': 'application/json; charset=utf-8'
      }
    };

    return this.http.get<any>(`${this.baseUrl}/GenericQuery/Executar?Query=${this.createQuery(tableName, columns)}`).pipe(
      map((resposta: any) => {
        return JSON.parse(resposta.toString()).classe[0];
      })
    );

  }

  private createQuery(table: string, columns: Column[]): string {

    let query = `select distinct `;

    query = query.concat(`(select count(*) from ${table}) as total, `);

    columns.forEach(c => {

      c.conditions.forEach(item => {

        if (item.tipo === 'null') {
          query = query.concat(`(select count(*) from ${table} where (${c.name} = '' or ${c.name} is null)) as ${c.name}_${item.tipo}, `);
        }

        if (item.tipo === 'maior') {
          query = query.concat(`(select count(*) from ${table} where (${c.name}  >  '${item.value}')) as ${c.name}_${item.tipo}, `);
        }

        if (item.tipo === 'menor') {
          query = query.concat(`(select count(*) from ${table} where (${c.name} < '${item.value}')) as ${c.name}_${item.tipo}, `);
        }

        if (item.tipo === 'like') {
          query = query.concat(`(select count(*) from ${table} where (${c.name} like '${item.value}%')) as ${c.name}_${item.tipo}, `);
        }

      });

    });

    query = query.substring(0, query.length - 2);

    //from clientes c group by c.${columns[0].name}
    query = query.concat(`&Type=ExecuteReader&nomebot=botha`);

    return query;

  }


  public getClientes(columns: Column[], table: string, columnName: string, condition: Condition) {

    const config = {
      headers: {
        Authorization: 'Bearer ' + this.storageService.getLocalToken(),
        'Content-Type': 'application/json; charset=utf-8'
      }
    };


    let colunas = '';
    let query = '';
    columns.forEach(item => {
      colunas = colunas.concat(item.name + ', ');
    });

    colunas = colunas.substring(0, colunas.length - 2);

    query = `select ${colunas} from ${table} `;

    if (condition) {
        query = query.concat(`where ${this.getQueryCondition(columnName, condition)}`);
    }

    query = query.concat(`&Type=ExecuteReader&nomebot=botha`);

    return this.http.get<any>(`${this.baseUrl}/GenericQuery/Executar?Query=${query}`).pipe(
      map((resposta: any) => {
        return JSON.parse(resposta.toString()).classe;
      })
    );
  }


  private getQueryCondition(columnName: string, condition: Condition): string {

    let clause = '';

    switch (condition.tipo) {
      case 'null': {
        clause = `(${columnName} = '' or ${columnName} is null)`;
        break;
      }
      case 'maior': {
        clause = (`(${columnName} > '${condition.value}')`);
        break;
      }
      case 'menor': {
        clause = (`(${columnName} < '${condition.value}')`);
        break;
      }
      case 'like': {
        clause = (`(${columnName} like '${condition.value}%')`);
        break;
      }
      default: {
        break;
      }
    }

    return clause;

  }

}
