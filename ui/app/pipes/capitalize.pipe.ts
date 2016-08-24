import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize'
})

export class CapitalizePipe implements PipeTransform {
    transform(str: string): string {
        let result = '';
        if (str != undefined) {
            result = str.charAt(0).toUpperCase() + str.substr(1);
        }
        return result;
    }
}