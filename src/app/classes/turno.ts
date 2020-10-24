export class Turno {

    public medico;
    public fecha;
    public horario;
    public especialidad:string;
    public estado:string;
    public paciente;

    constructor(medico, fecha, horario, especialidad,paciente)
    {
        this.medico = medico;
        this.fecha = fecha,
        this.especialidad = especialidad,
        this.horario = horario,
        this.estado = "Pendiente";
        this.paciente = paciente;
    }


}
