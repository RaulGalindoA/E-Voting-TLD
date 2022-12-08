import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TLDService } from '../services/tld.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  // public barChartLegend = true;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartPlugins = [];

  colors: string[] = [/* '#003BA0', '#00A642', '#A60000', '#009EAA', '#F07419' */];

  labels: any[] = []
  data: number[] = []

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [/* 'PAN', 'PRI', 'MORENA', 'NUEVA ALIANZA', 'MOVIMIENTO CIUDADANO' */],
    datasets: [
      {
        data: [/* 65, 59, 80, 81, 100 */],
        // backgroundColor: this.colors,
      },
    ],
  };

  public barChartOptions: ChartOptions= {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        offset: true,
        ticks: {
          autoSkip: false,
          // minRotation: 90
          // maxRotation: 0
        }
      },
      y: {
        offset: true
      }
    }
  };


  constructor(private tldService: TLDService, public location: Location) {}

  goBack(){
    this.location.back()
  }

  ngOnInit(): void {
    this.tldService.getResults().subscribe({
      next: (resp) => {
        console.log(resp)
        resp.forEach(element => {
          // this.labels.push(element.partido.split('-'));
          this.labels.push(element.candidato);
          this.data.push(element.votos);

          console.log(element.partido.split("-"))

          if      ( element.partido.includes('PAN') )             this.colors.push('#003BA0')
          else if ( element.partido.includes('PRI') )             this.colors.push('#00A642')
          else if ( element.partido.includes('Morena') )          this.colors.push('#A60000')
          else if ( element.partido.includes('Independiente') )   this.colors.push('#7b4675')
          else if ( element.partido.includes('Margarita') )       this.colors.push('#363d5c')
          else if ( element.partido.includes('UCC') )             this.colors.push("#007FAF")
          else this.colors.push('#DFDFDF')
        });

        this.barChartData.datasets[0].backgroundColor = this.colors

        this.barChartData.datasets[0].data = []
        this.barChartData.labels = [];

        this.barChartData.datasets[0].data = this.data
        this.barChartData.labels = this.labels

        this.chart?.update()
        console.log(this.barChartData)
      },
      error: (error) => {},
    });
  }
}
