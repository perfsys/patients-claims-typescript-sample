export class ClaimModel {
    constructor(
        public patient: string,
        public isdCode: Array<string>,
        public procedure: Array<string>,
    ) {}
}
