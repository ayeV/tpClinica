import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'horarioPipe'})
export class HorarioPipe implements PipeTransform {
    transform(horario: string) {
        if(horario >= '8:00' || horario < '13:00')
        {
            return horario + " AM";
        }
        else if(horario >= "13:00" || horario <="19:00")
        {
            return horario + " PM";
        }
    }
}
