import { Condition } from '../../../../shared/models/condition.model';
import { Cliente } from './../../../../shared/models/cliente.model';
import { BootService } from './../../../../services/boot.service';
import { Component, OnInit, Input } from '@angular/core';
import { EChartOption } from 'echarts';
import { Column } from 'src/app/shared/models/column.filter';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.scss']
})


export class ChartPieComponent implements OnInit {

  chartOption: EChartOption;
  clientes: Cliente[] = [];
  consultandoDados = false;
  consultandoClientes = false;
  filtroCondition: string;
  parametroBusca: string;
  restricaoBusca: string;
  titlePie: string;
  totalClientes: number;
  columnFiltro: Column;
  columns: Column[];
  allcolumns: Column[];
  tableName: string;
  conditionSelected: Condition;

  constructor(private bootservice: BootService) {
  }

  ngOnInit() { }

  onChartClick(value: any) {

    this.consultandoClientes = true;
    this.conditionSelected = null;
    this.filtroCondition = value.data.name;

    this.parametroBusca = value.data.name.split('_', value.data.name.split('_').length - 1).join('_');
    this.restricaoBusca = value.data.name.split('_')[value.data.name.split('_').length - 1];

    if (this.filtroCondition !== 'total') {
        this.columnFiltro = this.columns.find(colum => colum.name.toLowerCase() === this.parametroBusca.toLowerCase());
        this.conditionSelected = this.columnFiltro.conditions.find
        (item =>
            item.tipo.toLowerCase() === this.restricaoBusca.toLowerCase()
          );

        this.filtroCondition = this.filtroCondition.concat(' = ' + this.conditionSelected.value);

    }

    this.bootservice.getClientes(this.allcolumns,
      this.tableName,
      this.columnFiltro ? this.columnFiltro.name : '',
      this.conditionSelected).subscribe(response => {
        this.consultandoClientes = false;
        this.clientes = response;
      }, () => { this.consultandoClientes = false; });
  }

  loadDataSource(columns: Column[], title: string, tableName: string) {
    this.columns = [];
    this.columns = columns;

    this.chartOption = {};
    this.clientes = [];
    this.titlePie = title;

    const data: GraphData = {
      legendData: [],
      seriesData: [],
      selected: {}
    };

    this.consultandoDados = true;

    this.bootservice.getResultDadosCadastrais(tableName, columns).subscribe(response => {
      this.totalClientes = response.total;
      this.consultandoDados = false;
      Object.keys(response).forEach(item => {
        data.legendData.push(item);
        data.seriesData.push({
          name: item,
          value: response[item]
        });

      });

      this.loadChart(data, this.tableName.toLocaleUpperCase());

    }, error => { this.consultandoDados = false; });
  }

  private loadChart(data: GraphData, title: string) {

    this.chartOption = {
      title: {
        text: `${this.titlePie}`,
        subtext: 'Tabela',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/><b>Column/filtro - {b}</b><br/> Total: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: data.legendData,
        selected: data.selected
      },
      series: [
        {
          name: `Tabela - ${this.tableName}`,
          type: 'pie',
          radius: '55%',
          label: {
            formatter: '{abg|} {b|{b}：}{c} = {per|{d}%}  ',
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#999',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#aaa',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              b: {
                fontSize: 16,
                lineHeight: 33
              },
              per: {
                color: '#eee',
                backgroundColor: '#334455',
                padding: [2, 4],
                borderRadius: 2
              }
            }
          },

          data: data.seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }


}

interface SeriesData {
  name: string;
  value: number;
}

interface GraphData {
  legendData: string[];
  seriesData: SeriesData[];
  selected: { '*'?: boolean };
}


