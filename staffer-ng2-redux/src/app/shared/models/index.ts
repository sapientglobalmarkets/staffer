export class Skill {
    id: number;
    name: string;
}

export class Person {
    id: number;
    name: string;
    email: string;
    phone: string;
    skillIds: number[];
    needIds: number[];
}

export class Company {
    id: number;
    name: string;
}

export class Project {
    id: number;
    name: string;
    companyId: number;
}

export class Need {
    id: number;
    startDate: Date;
    endDate: Date;
    projectId: number;
    skillId: number;
    personId: number;

    // Parses the raw need returned by the server.
    // Converts string dates to Date objects.
    static parse(need: any): Need {
        need.startDate = new Date(need.startDate);
        need.endDate = new Date(need.endDate);
        return need;
    }
}

export class FilterState {

    constructor(
        public minStartDate: string = null,
        public maxStartDate: string = null,
        public projectId: number = -1,
        public skillId: number = -1,
        public status: string = 'open') {
    }
}

export class NeedsSummary {

    constructor(
        public open: number = 0,
        public closed: number = 0,
        public total: number = 0) {
    }

    reset() {
        this.open = 0;
        this.closed = 0;
        this.total = 0;
    }
}
