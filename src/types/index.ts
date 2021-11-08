export class Player {
    public name: string;
    public pointsByRound: number[];
    public winsByRound: boolean[];

    constructor (name: string) {
        this.name = name;
        this.pointsByRound = [0];
        this.winsByRound = [false];
    }
}