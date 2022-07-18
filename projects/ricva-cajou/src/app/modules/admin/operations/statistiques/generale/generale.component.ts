import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyErrorStateMatcher } from '@kolab/fuse/src/public-api';

import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { CampagneService } from '../../../administration/operations/campagne/campagne.service';
import { ExportateurService } from '../../../administration/operations/exportateur/exportateur.service';
import { Exportateur } from '../../../administration/operations/exportateur/exportateur.types';
import { Campagne } from '../../../administration/operations/campagne/campagne.types';

@Component({
  selector: 'app-generale',
  templateUrl: './generale.component.html',
  styleUrls: ['./generale.component.scss'],
})
export class GeneraleComponent implements OnInit {
  formFiltre: FormGroup;
  matcher = new MyErrorStateMatcher();
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Statistiques', range: null },
    { label: 'Générale', range: 'last' },
  ];
  headerExportateur = [
    { value: 'exportateur', label: 'Exportateur', name: 'Exportateur', class: ''},
    { value: 'entrepot', label: 'Total entrepôt', name: 'Total entrepôt', class: ''},
    { value: 'lot', label: 'Total lot', name: 'Total lot', class: ''},
    { value: 'poids', label: 'Total poids net', name: 'Total poids net', class: ''}
  ];

  // Environnement Required
  campagnes$: Observable<Campagne[]>;
  exportateurs$: Observable<Exportateur[]>;
  exportateurs: any[] = [
    {
      one: 'ACACIA EST COOP-CA',
      two: '3',
      three: '10',
      four: '1159329'
    },
    {
      one: 'AFRICOMMERCE',
      two: '2',
      three: '5',
      four: '2005455'
    },
    {
      one: 'AGRINORD',
      two: '2',
      three: '5',
      four: '2005455'
    }
  ];

  private chart: am4charts.XYChart;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone,
    private _formBuilder: FormBuilder,
    private _ExportateurService: ExportateurService,
    private _CampagneService: CampagneService,
  ) {
    this.filtreForm();
  }

  ngOnInit(): void {
    // Call observable
    this.campagnes$ = this._CampagneService.campagnes$;
    this.exportateurs$ = this._ExportateurService.exportateurs$;
  }

  filtreForm() {
    this.formFiltre = this._formBuilder.group({
      campagne: [null],
      out: [null],
    });
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      /** REPARTITION GRAPHIQUE DU TONNAGE ANALYSE PAR SITE **/
      let chart = am4core.create("chart-site", am4charts.XYChart);
      // Add data
      chart.data = [{
        "site": "Marcory",
        "poids": 501.9
      }, {
        "site": "Vridi",
        "poids": 301.9
      }, {
        "site": "Yopougon",
        "poids": 201.1
      }, {
        "site": "Bassam",
        "poids": 165.8
      }, {
        "site": "Marcory Zone 4",
        "poids": 139.9
      }, {
        "site": "Zone Industrielle",
        "poids": 128.3
      }, {
        "site": "Yopougon 2",
        "poids": 99
      },{
        "site": "Marcory 1",
        "poids": 501.9
      }, {
        "site": "Vridi 1",
        "poids": 301.9
      }, {
        "site": "Yopougon 1",
        "poids": 201.1
      }, {
        "site": "Bassam 1",
        "poids": 165.8
      }, {
        "site": "Marcory Zone 4 1",
        "poids": 139.9
      }, {
        "site": "Zone Industrielle 1",
        "poids": 128.3
      }, {
        "site": "Yopougon 3",
        "poids": 99
      }];

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "site";
      categoryAxis.title.text = "Entrepôt";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Poids net (Kg)";

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "poids";
      series.dataFields.categoryX = "site";
      series.name = "Sales";
      series.columns.template.tooltipText = "MDL4: {name}\nEntrepôt: {categoryX}\nValeur: {valueY}";
      series.columns.template.fill = am4core.color("#0071BC");

      this.chart = chart;


      /** GRAPHIQUE EN BANDE REPARTITION GRAPHIQUE DU TONNAGE EN FONCTION DES PLUS GRANDS EXPORTATEURS **/
      let chartNonAnalyse = am4core.create("chart-exportateur", am4charts.XYChart);
      // Add data
      chartNonAnalyse.data = [{
        "exportateur": "CECI",
        "poids": 165.8
      },{
        "exportateur": "Cayat",
        "poids": 160
      },{
        "exportateur": "Paci",
        "poids": 155
      },{
        "exportateur": "Scoops la paix",
        "poids": 150
      },{
        "exportateur": "CAUS",
        "poids": 145
      },{
        "exportateur": "Coops ca visa",
        "poids": 140
      },{
        "exportateur": "COPAC",
        "poids": 135
      },{
        "exportateur": "WAT-CI",
        "poids": 130
      },{
        "exportateur": "Agrinord",
        "poids": 125
      },{
        "exportateur": "Sanpta",
        "poids": 120
      },{
        "exportateur": "USCGN-CA",
        "poids": 115
      },{
        "exportateur": "Perfom world",
        "poids": 110
      },{
        "exportateur": "Agrinord 1",
        "poids": 100
      },{
        "exportateur": "Sanpta 1",
        "poids": 90
      },{
        "exportateur": "USCGN-CA 1",
        "poids": 80
      },{
        "exportateur": "Perfom world 1",
        "poids": 70
      }];

      // Create axes
      let categoryAxisNA = chartNonAnalyse.xAxes.push(new am4charts.CategoryAxis());
      categoryAxisNA.dataFields.category = "exportateur";
      categoryAxisNA.title.text = "Entrepôt";

      let valueAxisNA = chartNonAnalyse.yAxes.push(new am4charts.ValueAxis());
      valueAxisNA.title.text = "Poids net (Kg)";

      // Create series
      var seriesNA = chartNonAnalyse.series.push(new am4charts.ColumnSeries());
      seriesNA.dataFields.valueY = "poids";
      seriesNA.dataFields.categoryX = "exportateur";
      seriesNA.name = "Sales";
      seriesNA.columns.template.tooltipText = "MDL4: {name}\nExportateur: {categoryX}\nValeur: {valueY}";
      seriesNA.columns.template.fill = am4core.color("#0071BC");


      /** QUALITE PRODUIT ANALYSE **/
      var chartProduit = am4core.create("chart-produit", am4charts.PieChart);
      // Add data
      chartProduit.data = [{
        "title": "Outturn entre 38 et 53",
        "value": 501.9,
        "color": am4core.color("#0071BC")
      }, {
        "title": "Outturn inférieur à 38",
        "value": 301.9,
        "color": am4core.color("#1FC148")
      }];

      // Add and configure Series
      var pieSeries = chartProduit.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "title";
      pieSeries.dataFields.hidden = "hidden";

      // Let's cut a hole in our Pie chart the size of 40% the radius
      chartProduit.innerRadius = am4core.percent(40);

      // Disable ticks and labels
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      // Disable tooltips
      pieSeries.slices.template.tooltipText = "";

      // Add a legend
      chartProduit.legend = new am4charts.Legend();
      chartProduit.legend.position = "bottom";

      /** SITUATION DES ANALYSES **/
      var chartProduit = am4core.create("chart-situation", am4charts.PieChart);
      // Add data
      chartProduit.data = [{
        "title": "Lots non analysés",
        "value": 501.9,
        "color": am4core.color("#0071BC")
      }, {
        "title": "Lots analysés",
        "value": 301.9,
        "color": am4core.color("#1FC148")
      }];

      // Add and configure Series
      var pieSeries = chartProduit.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "title";
      pieSeries.dataFields.hidden = "hidden";

      // Let's cut a hole in our Pie chart the size of 40% the radius
      chartProduit.innerRadius = am4core.percent(40);

      // Disable ticks and labels
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      // Disable tooltips
      pieSeries.slices.template.tooltipText = "";

      // Add a legend
      chartProduit.legend = new am4charts.Legend();
      chartProduit.legend.position = "bottom";
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
