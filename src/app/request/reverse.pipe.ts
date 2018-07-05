import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(values: any, args?: any): any {
  	if(values.length > 1){
  		return values.slice().reverse();
  	}
    return values;
  }

}
