import {
    OutputRequisitionModel as RequisitionModel,
    ReportFormatter
} from 'enqueuer';
import {HtmlTemplate} from './html-template';
import {TestFlattener} from './test-flattener';

export class HtmlReportFormatter implements ReportFormatter {
    public format(report: RequisitionModel): string {
        const flatten = new TestFlattener().flatten(report);
        // console.log(JSON.stringify(flatten, null, 2));
        // console.log(!flatten.some(test => !test.valid));
        return HtmlTemplate.createFullHtml(report.name, JSON.stringify(flatten, null, 2));
    }
}
