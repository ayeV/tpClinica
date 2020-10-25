export class Notificacion {

    public mensaje:string;
    public medico;
    public paciente;
    public fecha;
    public estaLeido:boolean;
    public receptor;

    constructor(msj, nombreMedico, uidMedico, nombrePaciente,uidPaciente,fecha,estaLeido,receptor)
    {
        this.mensaje = msj;
        this.medico = {
            nombre:nombreMedico,
            uid:uidMedico
        };
        this.paciente = {
            nombre:nombrePaciente,
            uid:uidPaciente
        };
        this.fecha = fecha,
        this.estaLeido = estaLeido;
        this.receptor = receptor;
    }

}
