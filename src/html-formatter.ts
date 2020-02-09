import {
    OutputRequisitionModel as RequisitionModel,
    ReportFormatter
} from 'enqueuer';
import {HtmlTemplate} from './html-template';
import {Hierarchy, TestFlattener} from './test-flattener';

export class HtmlReportFormatter implements ReportFormatter {
    public format(report: RequisitionModel): string {
        const flatten = new TestFlattener().flatten(report);
        return HtmlTemplate.createFullHtml(JSON.stringify({
            summary: HtmlReportFormatter.calculateSummary(flatten),
            totalTime: HtmlReportFormatter.prettifyTime(report.time.totalTime),
            report,
            valid: !flatten.some(test => test.valid === false),
            name: report.name,
            flattenTests: flatten
        }));
    }

    private static calculateSummary(flatten: Hierarchy[]) {
        const length = flatten.length;
        const passingTests = flatten.reduce((acc, test) => acc - (!test.valid ? 1 : 0), length);
        const percentage = (passingTests * 100 / length).toFixed(2);
        return `${passingTests}/${length} - (${percentage}%)`;
    }

    private static prettifyTime(value: number) {
        return value
            .toString()
            .split('')
            .reverse()
            .reduce((acc: string[], letter, index, vec) => {
                acc.push((index % 3 === 2 && index !== vec.length - 1 ? ',' : '') + letter);
                return acc;
            }, [])
            .reverse()
            .join('')
            .concat('ms');
    }
}
