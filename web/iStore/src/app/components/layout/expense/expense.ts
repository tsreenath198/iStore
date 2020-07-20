export class Expense {
    constructor() {
        this.id = null;
        this.description = '';
        this.comment = '';
        this.mode = '';
        this.amount = null;
        this.date = '';
    }
    public id: number
    public amount: number
    public description: string
    public comment: string
    public mode: string
    public date: string
}