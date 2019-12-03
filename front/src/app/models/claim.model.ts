export class ClaimModel {
    constructor(
        public patient: string,
        public icdCodes: Array<string>,
        public procedures: Array<string>,
    ) {}
}
