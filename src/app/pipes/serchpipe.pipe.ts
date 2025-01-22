import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serchpipe'
})
export class SerchpipePipe implements PipeTransform {

  transform(value: any, serchText: any): any {
    if(!value) return null;
    if(!serchText) return value
    serchText = serchText.toLowerCase()
    return value.filter((item:any)=>JSON.stringify(item).toLowerCase().includes(serchText))
  }

}
