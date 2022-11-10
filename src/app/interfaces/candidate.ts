import { Partido } from './partido';
export interface Candidate {
    nombre: string;
    lema: string;
    nombre_coalicion: string;
    coalicion: Partido[];
    imagen: string;
}
