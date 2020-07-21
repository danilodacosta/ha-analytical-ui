import { Condition } from './../../../../shared/models/condition.model';
import { Column } from 'src/app/shared/models/column.filter';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-condition',
  templateUrl: './tab-condition.component.html',
  styleUrls: ['./tab-condition.component.scss']
})
export class TabConditionComponent implements OnInit {

  @Input() column: Column;
  @Input() filtroname: string;

  maior: string;
  menor: string;
  igual: string;
  nuloSelected: boolean;

  conditions: Condition[] = [];

  constructor() { }

  ngOnInit() {
  }

  changeNulo(): void {
    this.nuloSelected = !this.nuloSelected;
  }

  setValues(): void {

    this.conditions = [];
    this.column.conditions = this.conditions;

    if (this.maior) {

      const condition = {
        tipo: 'maior',
        value: this.maior
      };

      this.conditions.push(condition);
    }

    if (this.menor) {

      const condition = {
        tipo: 'menor',
        value: this.menor
      };

      this.conditions.push(condition);

    }

    if (this.igual) {
      const condition = {
        tipo: 'like',
        value: this.igual
      };

      this.conditions.push(condition);

    }

    if (this.nuloSelected) {
      const condition = {
        tipo: 'null',
        value: ''
      };

      this.conditions.push(condition);
    }


    if (this.conditions.length > 0) {
        this.column.conditions = this.conditions;
    }

  }

}
