import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markSearch'
})
export class MarkSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args) {
      var re = new RegExp(args, 'gi');
      return value.replace(re, "<mark>" + args + "</mark>");
    }
    return value;

  }
}
