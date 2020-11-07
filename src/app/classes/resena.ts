export class Resena {

    public medico;
    public paciente;
    public edad;
    public temperatura;
    public presion;

    constructor(nombreMedico,nombrePaciente,edad,temperatura,presion)
    {
        this.medico = nombreMedico,
        this.paciente = nombrePaciente,
        this.edad= edad;
        this.temperatura = temperatura,
        this.presion = presion;
       
    }
}
