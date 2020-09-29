import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: string, summaryLimit?: number): string {
    
    if(!value) return null;

    //limit to words to 20 if no limit arg was passed 
    let limit = (summaryLimit) ? summaryLimit : 10;
    //split the passed string into an array of words
    let words = value.split(" ");
    value = "";

    if(limit > words.length)
      limit = words.length;

    //add words until limit is reached and return
    for(let i = 0; i < limit; i++){
      value += words[i] + " ";
    }
    return value + '(...)';
  }

}
