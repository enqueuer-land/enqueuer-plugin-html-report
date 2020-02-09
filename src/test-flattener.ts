import {OutputRequisitionModel as RequisitionModel} from 'enqueuer';
import {ReportModel} from 'enqueuer/js/models/outputs/report-model';
import {IdCreator} from './id-creator';

type Hierarchy = {
    name: string,
    id: string,
};

export class TestFlattener {
    flatten(requisitionModel: RequisitionModel) {
        return this.goDeep(requisitionModel, []);
    }

    goDeep(report: ReportModel, hierarchy: Hierarchy[]) {
        const tests = Object
            .keys(report.hooks || {})
            .reduce((acc: Hierarchy[], hookName) => {
                return acc.concat(report.hooks![hookName]
                    .tests
                    .map(test => {
                        return {
                            ...test,
                            id: new IdCreator().create(20),
                            hierarchy: hierarchy.concat({
                                name: hookName,
                                id: new IdCreator().create(20),
                            })
                        };
                    }));
            }, []);

        const subComponents: ReportModel[] = (report.subscriptions || [])
            .concat(report.publishers || [])
            .concat(report.requisitions || []);

        const nested: Hierarchy[] = subComponents
            .reduce((acc: Hierarchy[], component: ReportModel) => {
                const iterationCounter = (component.totalIterations > 1) ? ` [${component.iteration}]` : '';
                return acc.concat(this.goDeep(component, hierarchy
                    .concat({
                        name: component.name + iterationCounter,
                        id: component.id
                    })));
            }, [] as Hierarchy[]);
        return tests.concat(nested);
    }
}
