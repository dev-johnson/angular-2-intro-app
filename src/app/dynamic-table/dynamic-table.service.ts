import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DynamicTableService {

  // use interceptor to alter or modify the request client <-to-> server and also for logging
  // https://angular.io/guide/http#intercepting-all-requests-or-responses

  constructor(private http: HttpClient) { }

  getData(link, removeColumns=[]) {
      return this.http.get(link)
        .map(result => {
          let columns = [];
          for (let key in result[0]) {
            if(removeColumns.indexOf(key) === -1){
              columns.push(key)
            }
          }
          result = {records: result, columns: columns}
          return result
        })
        .catch(this.handleError);
  }

  addItem(data) {
    let newList = {};
    for (let item in data) {
      newList[item] = data[item]
    }
    return newList;
  }

  updateItem(data) {
    let updatedList = {};
    for (let item in data) {
      updatedList[item] = data[item]
    }
    return updatedList;
  }

  handleError(error: Response) {
    return Observable.throw(error || "server error");
  }
}
