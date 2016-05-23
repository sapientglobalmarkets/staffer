import { Need } from '../models/index';

export class AppState {
    staffer: {
        needMap: any;
        projectMap: any;
        skillMap: any;
        personMap: any;

        needs: Need[];
    }
}

export const initialState: AppState = {
    staffer: {
        needMap: {},
        projectMap: {},
        skillMap: {},
        personMap: {},

        needs: []
    }
};
