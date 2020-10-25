export class Resena {

    public medico;
    public paciente;
    public edad;
    public temperatura;
    public presion;
    public id;


    constructor(uidMedico,nombreMedico,nombrePaciente,uidPaciente,edad,temperatura,presion,id)
    {
        this.medico = {
            nombre:nombreMedico,
            uid:uidMedico
        }
        this.paciente = {
            nombre:nombrePaciente,
            uid:uidPaciente
        },
        this.edad= edad;
        this.temperatura = temperatura,
        this.presion = presion;
        if(id != null)
        {
            this.id = id;
        }
    }
}
