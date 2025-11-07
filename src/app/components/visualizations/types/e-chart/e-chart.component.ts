import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReportService } from 'src/app/services/custom/report.service';
import { lib } from 'src/app/services/static/global-functions';

import { DynamicScriptLoaderService } from 'src/app/services/custom/custom.service';
import { thirdPartyLibs } from 'src/app/services/static/thirdPartyLibs';
import { EnvService } from 'src/app/services/core/env.service';
import { dogF } from 'src/environments/environment';

declare var echarts: any;

@Component({
	selector: 'app-e-chart',
	template: '<div style="height: 100%;" [id]="elId"></div>',
	standalone: false,
})
export class EChartComponent implements OnInit {
	elId: string = ''; //Chart element Id
	chart = null; //Chart object

	@Input() chartType: string = 'auto';
	@Input() viewMode: 'full' | 'mini' | 'dashboard';
	@Input() chartOption: any = {};
	@Input() dimensions: string[] = [];
	@Input() viewDimension: string;
	@Input() compareBy: string[] = [];
	@Input() measureBy: string[] = [];
	@Input() dataIntervalProperty: string;
	@Input() dataIntervalType: string;

	@Input() chartScript: string;

	@Input() data: any[] = [];
	@Input() comparitionData: any[] = [];

	constructor(
		public rpt: ReportService,
		public env: EnvService,
		public dynamicScriptLoaderService: DynamicScriptLoaderService
	) {
		this.elId = lib.generateCode();
	}

	ngOnInit() {}

	ngAfterViewInit() {
		this.loadEchartLib();
		new ResizeObserver(() => this.chart?.resize()).observe(document.getElementById(this.elId));
	}

	loadEchartLib() {
		if (typeof echarts !== 'undefined') this.initChart();
		else
			this.dynamicScriptLoaderService
				.loadResources(thirdPartyLibs.echart.source)
				.then(() => this.initChart())
				.catch((error) => console.error('Error loading script', error));
	}

	ngOnChanges(changes: any) {
		if (this.chart) {
			if (changes.chartOption && changes.chartOption.currentValue) {
				Object.assign(this.chartOption, changes.chartOption.currentValue);
			}
			this.updateChart();
		}
	}

	ngOnDestroy() {
		this.chart?.dispose();
	}

	initChart() {
		this.chart = echarts.init(document.getElementById(this.elId));
		this.chart.on('click', (params) => {
			this.onChartClick(params);
		});
		this.updateChart();
	}

	updateChart() {
		let finalChartOption = {};
		switch (this.chartType) {
			case 'auto':
				if (this.data.length) {
					finalChartOption = this.rpt.echartDefaultOption.getChartOption(
						this.chartType,
						this.viewMode,
						this.dataIntervalProperty,
						this.dataIntervalType,
						this.dimensions,
						this.data,
						this.comparitionData
					);
				}
				break;

			case 'bar':
			case 'line':
				this.rpt.echartDefaultOption.updateSeriesByDimension(this.chartOption, this.chartType, this.chartOption.dataset['dimensions']);
				finalChartOption = this.chartOption;
				break;
			case 'fixed':
				finalChartOption = this.rpt.echartDefaultOption.mergeDefaultChartOption(this.chartOption, this.viewMode);
				break;
			case 'manual':
				finalChartOption = this.chartOption;
				break;
		}

		if (this.chartScript) {
			finalChartOption = this.calcChartOption(finalChartOption, this.chartScript);
		}

		setTimeout(() => {
			this.chart?.setOption(finalChartOption, true);
		}, 0);
	}

	calcChartOption(option, js: string) {
		let li = lib;
		let ec = echarts;
		// 1. Validate syntax
		if (!this.isValidJavaScript(js)) {
			this.env.showMessage('Invalid chart script syntax', 'danger');
			return option;
		}
		
		// 2. Check blacklist
		const dangerousCheck = this.containsDangerousCode(js);
		if (dangerousCheck.found) {
			const keywords = dangerousCheck.keywords.join(', ');
			dogF && console.error('Dangerous keywords detected:', dangerousCheck.keywords);
			this.env.showMessage(
				`Chart script contains unsafe operations: ${keywords}`,
				'danger'
			);
			return option;
		}
		
		// 3. Execute with error handling
		try {
			eval(js);
		} catch (error) {
			dogF && console.error('Chart script execution error:', error);
			dogF && console.log('Chart script:', js);
			this.env.showMessage(
				`Chart script error: ${error.message}`,
				'danger'
			);
		}
		
		return option;
	}

	private isValidJavaScript(code: string): boolean {
		try {
			new Function(code);
			return true;
		} catch (error) {
			dogF && console.error('JS syntax error:', error);
			return false;
		}
	}
	
	private containsDangerousCode(code: string): { found: boolean; keywords: string[] } {
		const blacklistPatterns = [
			{ pattern: /\bdocument\s*\.\s*cookie\b/gi, name: 'document.cookie' },
			{ pattern: /\blocalStorage\b/gi, name: 'localStorage' },
			{ pattern: /\bsessionStorage\b/gi, name: 'sessionStorage' },
			{ pattern: /\bwindow\s*\.\s*location/gi, name: 'window.location' },
			{ pattern: /\bfetch\s*\(/gi, name: 'fetch()' },
			{ pattern: /\bXMLHttpRequest\b/gi, name: 'XMLHttpRequest' },
			{ pattern: /\bimport\s*\(/gi, name: 'dynamic import()' },
			{ pattern: /\brequire\s*\(/gi, name: 'require()' },
			{ pattern: /\b__proto__\b/gi, name: '__proto__' },
			{ pattern: /\bconstructor\s*\.\s*constructor\b/gi, name: 'constructor.constructor' },
			{ pattern: /\beval\b/gi, name: 'eval' },

		];
		
		const foundKeywords: string[] = [];
		
		for (const item of blacklistPatterns) {
			if (item.pattern.test(code)) {
				foundKeywords.push(item.name);
			}
		}
		
		return {
			found: foundKeywords.length > 0,
			keywords: foundKeywords
		};
	}

	@Output() chartClick = new EventEmitter();
	onChartClick(e) {
		this.chartClick.emit(e);
	}

	@Output() dataChange = new EventEmitter();
	outData(e) {
		this.dataChange.emit(e);
	}
}
