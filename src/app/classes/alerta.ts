export class Alerta {
    id: string;
    type: AlertType;
    message: string;
    autoClose: boolean;
    keepAfterRouteChange: boolean;
    fade: boolean;

    constructor(init?:Partial<Alerta>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}