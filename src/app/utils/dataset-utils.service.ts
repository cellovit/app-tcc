import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasetUtilsService {

  constructor() { }

  groupByPropertyAndSum(objectArray: Array<any>, groupProperty: string, sumProperty: string) {

    let groupedResult = [];

    objectArray.reduce(function (res, value) {
      if (!res[value[groupProperty]]) {
        res[value[groupProperty]] = {};
        res[value[groupProperty]][groupProperty] = value[groupProperty];
        res[value[groupProperty]][sumProperty] = 0;

        groupedResult.push(res[value[groupProperty]]);
      }
      res[value[groupProperty]][sumProperty] += value[sumProperty];
      return res;
    }, {});

    return groupedResult;
  }

  groupByProperties(objectArray: Array<any>, groupProperty: string, sumProperty: string, aditionalProperties?: Array<string>) {

    let groupedResult = [];

    objectArray.reduce(function (res, value) {

      if (!res[value[groupProperty]]) {
        res[value[groupProperty]] = {};
        res[value[groupProperty]][groupProperty] = value[groupProperty];
        res[value[groupProperty]][sumProperty] = 0;

        aditionalProperties.forEach(x => {
          res[value[x]] = {};
          res[value[groupProperty]][x] = value[x];
        });

        groupedResult.push(res[value[groupProperty]]);
      }

      res[value[groupProperty]][sumProperty] += value[sumProperty];

      return res;
    }, {});

    return groupedResult;
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  parseDatasetStringValue(propertyValue: string) {
    const parsed: number = Number.parseFloat(propertyValue);
    return Number(parsed.toFixed(0)) / 1000000;
  }

  parseDatasetStringValueReceita(propertyValue: string) {
    const parsed: number = Number.parseFloat(propertyValue);
    return Number(parsed.toFixed(0));
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' Mi';
  }
}
