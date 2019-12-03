export class ClaimModel {
    constructor(
        public patient: string,
        public isdCode: Array<any>,
        public procedure: Array<any>,
    ) {}
}
