import { MenuItem } from 'primeng/api';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {


  @ViewChild('month', {static : true}) month: ElementRef = null;
  @ViewChild('year',  {static : true}) year: ElementRef = null;

  cities2: City[];
  selectedCities2: City[];

  items: MenuItem[];

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  data: any;




  chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };


  pieData = {
    labels: ['Nome', 'RG', 'CPF'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                '#FFC107',
                '#03A9F4',
                '#4CAF50'
            ],
            hoverBackgroundColor: [
                '#FFE082',
                '#81D4FA',
                '#A5D6A7'
            ]
        }]
    };

    pieOptions = {
    legend: {
        position: 'top'
    } , title: {
      display: true,
      text: 'DADOS BASICOS'
  },
  animation: {
      animateScale: true,
      animateRotate: true
  }
};



pieData2 = {
  labels: ['CEP', 'LOGRADOURO'],
  datasets: [
      {
          data: [300, 50],
          backgroundColor: [
            this.getRandomColor(),
            this.getRandomColor(),
          ],
          hoverBackgroundColor: [
              '#FFE082',
              '#81D4FA'

          ]
      }]
  };

  pieOptions2 = {
  legend: {
      position: 'right'
  } ,

  /*title: {
    display: true,
    text: 'ENDEREÇO'
},*/
animation: {
    animateScale: true,
    animateRotate: true
}
};



  constructor() {


    this.data = {
      labels: ['CEP', 'Logradouro', 'N°'],
      datasets: [

          {
              label: 'Endereço',
              backgroundColor: this.getRandomColor(),
              borderWidth: 1,
              borderColor: this.getRandomColor(),
              data: [32, 40, 52]
          }
     ]

  }


    this.cities2 = [
      {name: 'Nome', code: 'NY'},
      {name: 'Rg', code: 'RM'},
      {name: 'Cpf', code: 'PRS'},
      {name: 'Telefone', code: 'LDN'},
      {name: 'celular', code: 'IST'}
  ];

  }

  ngOnInit() {

  }


  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;
  }


  private setValues(){
    this.calculateBalance();
    this.setChartData();
  }


  private calculateBalance(){
    let expenseTotal = 0;
    let revenueTotal = 0;
  }


  private setChartData() {
    this.revenueChartData = this.getChartData('revenue', 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('expense', 'Gráfico de Despesas', '#e03131');
  }


  private getChartData(entryType: string, title: string, color: string) {
    const chartData = [];

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    };
  }


  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

}
