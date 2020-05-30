import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { LineaComponent } from './linea/linea.component';
import { CoronavirusService } from './coronavirus.service';
import {HttpModule} from '@angular/http';
import { FiltrarDataTablaPipe } from './filtrar-data-tabla.pipe';



@NgModule({
  imports:      [ BrowserModule, FormsModule,ChartsModule,HttpModule ],
  declarations: [ AppComponent, LineaComponent, FiltrarDataTablaPipe,  ],
  bootstrap:    [ AppComponent ],
  providers: [CoronavirusService]
})
export class AppModule { }
/**Para chart Js
 * https://valor-software.com/ng2-charts/
 * ng2-charts
 * chart.js || <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script> en index.html
 * 
 */