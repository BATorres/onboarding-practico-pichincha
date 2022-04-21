import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser',
})
export class SearchUserPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase().trim();

    return value.filter(function (data) {
      return (
        data.name.toLowerCase().includes(args) ||
        data.email.toLowerCase().includes(args) ||
        data.role.toLowerCase().includes(args)
      );
    });
  }
}
