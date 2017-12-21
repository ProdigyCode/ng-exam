import { Http, Response, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";
import { environment } from '../../environments/environment';

import 'rxjs/Rx';


@Injectable()
export class HttpService {

	private http;
  constructor(http:Http) {
    this.http = http;
  }

	getWithUrl(url: string, success, error) {
    this.http.get(url, this.getOptions()).map(this.extractData).subscribe(
      data => {
        success(data)
      },
      err => {
        console.log(err);
      }
    );
  }

  get(url, success, error) {
    this.getWithUrl(environment.endpoint + url, success, error)
	}

  getMock(url, success, error) {
  	return this.http.get(url).map(this.extractData).subscribe(
  	  data => success(data),
      err => {if(err != undefined)error(err)}
    )
  }

	private extractData(res: Response) {
	    let body = res.json();
	    return body || { };
  }

  private getOptions() {
    var options = new RequestOptions({
      withCredentials: false
    });
    return options;
  }
}
