import { Component, OnInit,ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { CoronavirusService } from '../coronavirus.service';

//https://valor-software.com/ng2-charts/
@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styleUrls: ['./linea.component.css']
})
export class LineaComponent implements OnInit {
  slug="ecuador";
  listaPaises=[];
  filterPost='';
  filterPais='';
  dataCopyPais:any[]=[];
  data:any[]=[];
  dataCopy:any[]=[];
  muertos:number[]=[];
  contagiados:number[]=[];
  recuperados:number[]=[];
  date:string[]=[];
constructor(private cvS:CoronavirusService){
this.onGetData()


}  
  setData(){
   

    for(let d of this.data){
      this.muertos.push(d.Deaths);
      this.contagiados.push(d.Confirmed);
      this.recuperados.push(d.Recovered);
      
      this.date.push(d.Date.slice(0, 10))
    }
    
   
    
  }
  eraseData(){
   

    for(let d of this.data){
      this.muertos.splice(d.Deaths);
      this.contagiados.splice(d.Confirmed);
      this.recuperados.splice(d.Recovered);
      
      this.date.splice(d.Date.slice(0, 10))
    }
    
   
    
  }
  

    public lineChartData: any[] = [
    { data: this.contagiados, label: 'Confirmados' },
    { data: this.muertos, label: 'Muertos' },
    { data: this.recuperados, label: 'Recuperados' }
  ];
  public lineChartLabels: Label[] = this.date;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        ticks: {
            fontColor: 'white',
          }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: 'white',
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
   
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  ngOnInit() {
  }

  



  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
   //console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  
 
  public filtrarPais(){
    //console.log("clicked");
     const resultPost=[];
    for(const post of this.listaPaises){
      if(post.Slug.toLowerCase().indexOf(this.filterPais.toLowerCase())>-1){
        //console.log(post)
       resultPost.push(post);
      };
    };
    this.dataCopyPais= resultPost;
  }
  onCountrySelect(pais:any){
    this.slug=pais.Slug;
    this.onGetData();
  }

  onGetData(){
    this.eraseData()
   
    this.cvS.getData(this.slug).subscribe(resp=>{
  this.data=resp;
  this.setData();
 // console.log(this.data)
  this.dataCopy=this.data.reverse();
})
this.cvS.getCountries().subscribe(resp=>{
  this.listaPaises=resp;
  
})

  }
}