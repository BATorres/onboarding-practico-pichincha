import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchRole'
})
export class SearchRolePipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(!value)return null;
      if(!args)return value;

      args = args.toLowerCase().trim();

      return value.filter(function(data){
          return data.name.toLowerCase().includes(args);
      });
  }
}
