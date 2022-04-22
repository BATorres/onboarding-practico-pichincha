import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase().trim();

    return value.map(({id, ...value}) => value).filter(function (data) {
      return JSON.stringify(data).toLowerCase().includes(args);
    });
  }
}
