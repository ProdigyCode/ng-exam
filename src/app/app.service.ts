import { Injectable, Inject } from '@angular/core';
import { HttpService } from '../common/service/http.service';
import { environment } from '../environments/environment';

@Injectable()
export class AppService {
  loadMapUrl = '/rest/v2/name';
  loadCountryUrl = '/rest/v2/regionalbloc';

  constructor(private httpService: HttpService) {  }

  loadCountryDetail(country: string, subscribe) {
    if(environment.mock) {
      this.httpService.getMock("/src/app/mocks/map.json", subscribe, null);
    } else {
      this.httpService.get(this.loadMapUrl + '/' + country, subscribe, null);
    }
  }

  loadCountries(region: string, subscribe) {
    if(environment.mock) {
      this.httpService.getMock("/src/app/mocks/map.json", subscribe, null);
    } else {
      this.httpService.get(this.loadCountryUrl + '/' + region, subscribe, null);
    }
  }
}
