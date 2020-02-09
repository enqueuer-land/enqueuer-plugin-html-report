export class IdCreator {

    private possible: string;

    public constructor(possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
        this.possible = possible;
    }

    public create = (length: number = 10): string => {
        let text = 'id';

        for (let i = length; i > 0; --i) {
            text += this.possible.charAt(Math.floor(Math.random() * this.possible.length));
        }

        return text;
    }

}
