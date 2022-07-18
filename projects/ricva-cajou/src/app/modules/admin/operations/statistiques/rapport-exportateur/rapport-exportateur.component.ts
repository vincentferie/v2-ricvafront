import { Component, OnInit, Inject, NgZone, PLATFORM_ID, inject } from '@angular/core';
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
  selector: 'app-rapport-exportateur',
  templateUrl: './rapport-exportateur.component.html',
  styleUrls: ['./rapport-exportateur.component.scss'],
})
export class RapportExportateurComponent implements OnInit {
  formFiltre: FormGroup;
  matcher = new MyErrorStateMatcher();
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Statistiques', range: null },
    { label: 'Rapport exportateur', range: 'last' },
  ];
  headerLot = [
    { value: 'exportateur', label: 'Exportateur', name: 'Exportateur', class: ''},
    { value: 'entrepot', label: 'Entrepôt', name: 'Entrepôt', class: ''},
    { value: 'parcelle', label: 'Parcelle', name: 'Parcelle', class: ''},
    { value: 'poids', label: 'Poids', name: 'Poids net', class: ''},
  ];
  headerExportateur = [
    { value: 'camion', label: 'Camion', name: 'Camion', class: ''},
    { value: 'remorque', label: 'Remorque', name: 'Remorque', class: ''},
    { value: 'lot', label: 'Lot', name: 'Lot', class: ''},
    { value: 'outturn', label: 'Outturn', name: 'Outturn', class: ''},
    { value: 'entrepot', label: 'Entrepôt', name: 'Entrepôt', class: ''},
    { value: 'poids', label: 'Poids', name: 'Poids', class: ''},
  ];

  // Environnement Required
  campagnes$: Observable<Campagne[]>;
  exportateurs$: Observable<Exportateur[]>;
  lots: any[] = [
    {
      one: 'AFRICOMMERCE',
      two: 'PALM BEACH 1',
      three: '2',
      four: '62594'
    },
    {
      one: 'AFRICOMMERCE',
      two: 'PALM BEACH 1',
      three: '2',
      four: '62594'
    }
  ];
  exportateurs: any[] = [
    {
      one: '4477KG03',
      two: '68CY09',
      three: '71',
      four: '46.28',
      five: 'S3C',
      six: '349558'
    },
    {
      one: '4477KG03',
      two: '68CY09',
      three: '71',
      four: '46.28',
      five: 'S3C',
      six: '349558'
    }
  ];

  private chart: am4charts.XYChart;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone,
    private _formBuilder: FormBuilder,
    private _CampagneService: CampagneService,
    private _ExportateurService: ExportateurService,
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
      exportateur: [null],
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
      let chart = am4core.create("chart-analyse", am4charts.XYChart);
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


      /** REPARTITION GRAPHIQUE DU TONNAGE ANALYSE PAR SITE **/
      let chartNonAnalyse = am4core.create("chart-non-analyse", am4charts.XYChart);
      // Add data
      chartNonAnalyse.data = [{
        "site": "Bassam",
        "poids": 165.8
      }];

      // Create axes
      let categoryAxisNA = chartNonAnalyse.xAxes.push(new am4charts.CategoryAxis());
      categoryAxisNA.dataFields.category = "site";
      categoryAxisNA.title.text = "Entrepôt";

      let valueAxisNA = chartNonAnalyse.yAxes.push(new am4charts.ValueAxis());
      valueAxisNA.title.text = "Poids net (Kg)";

      // Create series
      var seriesNA = chartNonAnalyse.series.push(new am4charts.ColumnSeries());
      seriesNA.dataFields.valueY = "poids";
      seriesNA.dataFields.categoryX = "site";
      seriesNA.name = "Sales";
      seriesNA.columns.template.tooltipText = "MDL4: {name}\nEntrepôt: {categoryX}\nValeur: {valueY}";
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
