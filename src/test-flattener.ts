import { OutputTaskModel } from "enqueuer";
import { ReportModel } from "enqueuer/dist/models/outputs/report-model";
import { IdCreator } from "./id-creator";
import { TestModel } from "enqueuer/dist/models/outputs/test-model";

export type Hierarchy = {
  name: string;
  id: string;
  [propname: string]: any;
};

export class TestFlattener {
  public flatten(outputTaskModel: OutputTaskModel): Hierarchy[] {
    return this.goDeep(outputTaskModel, []);
  }

  private goDeep(report: ReportModel, hierarchy: Hierarchy[]): Hierarchy[] {
    const tests: Hierarchy[] = Object.keys(report.hooks || {}).reduce(
      (acc: Hierarchy[], hookName) => {
        return acc.concat(
          report.hooks![hookName].tests.map((test: TestModel) => {
            const result: Hierarchy = {
              ...test,
              id: new IdCreator().create(20),
              name: test.name || test.description,
              hierarchy: hierarchy.concat({
                name: hookName,
                id: new IdCreator().create(20),
              }),
            };
            return result;
          })
        );
      },
      []
    );

    const subComponents: ReportModel[] = (report.sensors || [])
      .concat(report.actuators || [])
      .concat(report.tasks || []);

    const nested: Hierarchy[] = subComponents.reduce(
      (acc: Hierarchy[], component: ReportModel) => {
        const iterationCounter =
          component.totalIterations > 1 ? ` [${component.iteration}]` : "";
        return acc.concat(
          this.goDeep(
            component,
            hierarchy.concat({
              id: component.id,
              name: component.name + iterationCounter,
            })
          )
        );
      },
      [] as Hierarchy[]
    );
    return tests.concat(nested);
  }
}
