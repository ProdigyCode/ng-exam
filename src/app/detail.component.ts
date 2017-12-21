import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AppService } from './app.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'detail',
  templateUrl: 'detail.component.html',
  providers: [AppService]
})

export class DetailComponent implements OnInit {
	
	private appService: AppService;

	private router: Router;
	private route: ActivatedRoute;
	
	private _countryDetail: CountryDetail;
	private _countryDisplayList: any;

	private _region: string;
	private _language: string;
	private _country: string;

	static DEFAULT_REGION = 'asean';
	static DEFAULT_LANGUAGE = 'en';
	static DEFAULT_COUNTRY = 'indonesia'

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _appService: AppService
	) {
		this.router = _router;
		this.route = _route;
		this.appService = _appService;

		this._countryDisplayList = new Array();
		this._countryDetail = new CountryDetail();
	}
	
	ngOnInit() {
		let self = this;
		this.route.params.subscribe(param => {
			if(param) {
				self.region = param['region'];
				self.language = param['language'];
				self.country = param['country'];
				if(self.region === undefined) {
					self.region = DetailComponent.DEFAULT_REGION;
				}
				if(self.language === undefined) {
					self.language = DetailComponent.DEFAULT_LANGUAGE;
				}
			} else {
				self.region = DetailComponent.DEFAULT_REGION;
				self.language = DetailComponent.DEFAULT_LANGUAGE;
			}
			this.appService.loadCountries(self.region,
				result => {
					self._countryDisplayList = new Array();
					result.map(country => {
						self._countryDisplayList.push({id: country.name.toLowerCase(), name : country.name});
					});
					if(self.country === undefined || self.country === '') {
						self.country = self._countryDisplayList[0].id;
					} else {
						self.country = self.country.toLocaleLowerCase();
					}
					self.appService.loadCountryDetail(self.country, result => {
						if(result && result.length > 0) {
							self._countryDetail = new CountryDetail();
							self._countryDetail.id = result[0].name;
							self._countryDetail.name = result[0].translations
							self._countryDetail.capital = result[0].capital;
							self._countryDetail.area = result[0].area;
							self._countryDetail.region = result[0].region;
							self._countryDetail.flag = result[0].flag;
							self._countryDetail.regional_blocs = result[0].regionalBlocs[0].acronym;
							self._countryDetail.latlng = result[0].latlng;
							self._countryDetail.marker = result[0].name.substring(0,1);
						}
					});
				});
		});
	}
	
	ok() {
		window.location.href = 'map/' + this.region + '/' + this.language;
		// this.router.navigate(['map', { region: this.region }, { language: this.language }]);
	}

	getCountryName() {
		if(this._countryDetail !== undefined) {
			if(this._countryDetail.name !== undefined) {
				if(this._countryDetail.name[this.language] !== undefined) {
					return this._countryDetail.name[this.language];
				} else return this._countryDetail.id;
			}
		}
	}

	getMarkers() {
		if(this._countryDetail !== undefined && this._countryDetail.marker !== undefined) {
			return this._countryDetail.marker
		}
	}

	getStaticMapUrl() {
		if(this.countryDetail !== undefined && this.countryDetail.latlng !== undefined) {
			return 'https://maps.googleapis.com/maps/api/staticmap?center=' + this.countryDetail.latlng[0] + "," + this.countryDetail.latlng[1] + '&zoom=6&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:' + this.getMarkers() + '%7C' + this.countryDetail.latlng[0] + "," + this.countryDetail.latlng[1] + '&key=' + environment.google_api_key;
		}
	}

	get region(): string {
		return this._region;
	}

	get language(): string {
		return this._language;
	}

	get country(): string {
		return this._country;
	}

	set region(_region: string) {
		this._region = _region;
	}

	set language(_language: string) {
		this._language = _language;
	}

	set country(_country: string) {
		this._country = _country;
	}

	get countryDetail() {
		return this._countryDetail;
	}

	get countryDisplayList() {
		return this._countryDisplayList;
	}
}

class CountryDetail {
	id: string;
	name: any;
	capital: string;
	area: string;
	region: string;
	regional_blocs: string;
	flag: string;
	latlng: any;
	marker: string;
}