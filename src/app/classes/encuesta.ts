export class Encuesta {
    public paciente;
    public medico;
    public id;
    public puntuacionAtencion:number;
    public comentario:string;
    public estaConforme:boolean;

    constructor(uidMedico,nombreMedico,nombrePaciente,uidPaciente,puntuacionAtencion,comentario,estaConforme, id)
    {
        this.medico = {
            nombre:nombreMedico,
            uid:uidMedico
        };
        this.paciente = {
            nombre:nombrePaciente,
            uid:uidPaciente
        };
        this.puntuacionAtencion = puntuacionAtencion;
        this.comentario = comentario;
        this.id = id;
        this.estaConforme = estaConforme;

    }
}
