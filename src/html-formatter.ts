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
            report,
            actionButtons: HtmlReportFormatter.createActionButtons(),
            summary: HtmlReportFormatter.calculateSummary(flatten),
            totalTime: HtmlReportFormatter.prettifyTime(report.time.totalTime),
            ignoredTestsLength: HtmlReportFormatter.getIgnoredTests(flatten),
            valid: !flatten.some(test => test.valid === false),
            name: report.name,
            flattenTests: flatten
        }));
    }

    private static calculateSummary(flatten: Hierarchy[]): string {
        const length = flatten.length;
        const passingTests = flatten.reduce((acc, test) => acc - (!test.valid ? 1 : 0), length);
        const percentage = (passingTests * 100 / length).toFixed(2);
        return `${passingTests}/${length} - (${percentage}%)`;
    }

    private static getIgnoredTests(flatten: Hierarchy[]): number {
        return flatten.reduce((acc, test) => acc + (test.ignored ? 1 : 0), 0);
    }

    private static createActionButtons(): object[] {
        return [
            {
                active: true,
                icon: 'far fa-check-circle',
                color: '#9FB630',
                propertyFilterName: 'showPassingTests'
            },
            {
                active: true,
                icon: 'far fa-times-circle',
                color: '#a9524a',
                propertyFilterName: 'showFailingTests'
            },
            {
                active: false,
                // <i class="fas fa-exclamation"></i>
                icon: 'fas fa-exclamation-circle',
                color: '#d7ba53',
                propertyFilterName: 'showIgnoredTests'
            },
        ];
    }

    private static prettifyTime(value: number): string {
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
