import {
    OutputRequisitionModel as RequisitionModel,
    ReportFormatter
} from 'enqueuer';
import {HtmlTemplate} from './html-template';
import {TestFlattener} from './test-flattener';

export class HtmlReportFormatter implements ReportFormatter {
    public format(report: RequisitionModel): string {
        const hierarchies = new TestFlattener().flatten(report);
        return HtmlTemplate.createFullHtml(JSON.stringify(hierarchies, null, 2));
    }
}
