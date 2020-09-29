import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFromIso'
})
export class CountryFromIsoPipe implements PipeTransform {

  transform(value: string): string {

    switch(value)
    {
      case "de-DE":
        value += " (German)";
        break;
      case "en-EN":
        value += " (English)";
        break;
      case "pt-PT":
        value+= " (Portuguese)"
        break;
      case "el-EL":
        value+= " (Greek)"
        break;
      default:
        value+= " (unknown country)"
    }
    return value;
  }

}
