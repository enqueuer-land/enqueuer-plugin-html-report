import {MainInstance, PublisherModel, SubscriptionModel, RequisitionModel, TestsAnalyzer, Test, ReportFormatter} from 'enqueuer-plugins-template';
import {StringRandomCreator} from './string-random-creator';

export class HtmlReportFormatter implements ReportFormatter {
    private readonly PUBLISHER_COLOR = '#7f8078';
    private readonly SUBSCRIPTION_COLOR = '#2b3d6b';
    private readonly REQUISITION_COLOR = '#a68458';

    public format(report: RequisitionModel): string {
        const body = this.createRequisitionCard(report);
        return this.createFullHtml(body);
    }

    private static escapeToSafeHtml(text: string): string {
        return text.replace(/[&<>"]/g, (tag: string) => {
            const charsToReplace: any = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&#34;'
            };
            return charsToReplace[tag] || tag;
        });
    }

    private createRequisitionCard(requisitionModel: RequisitionModel): string {
        let accordionCards = this.createTestAccordionCard(requisitionModel, this.REQUISITION_COLOR);

        if (requisitionModel.publishers && requisitionModel.publishers.length > 0) {
            const inner = requisitionModel.publishers
                .map(publisher => this.createAccordionCard(HtmlReportFormatter.escapeToSafeHtml(publisher.name),
                    this.createPublisherCard(publisher),
                    this.PUBLISHER_COLOR))
                .join('');
            const publishers = this.createAccordionCard('Publishers', inner, this.PUBLISHER_COLOR);
            accordionCards += publishers;
        }

        if (requisitionModel.subscriptions && requisitionModel.subscriptions.length > 0) {
            const inner = requisitionModel.subscriptions
                .map(subscription => this.createAccordionCard(HtmlReportFormatter.escapeToSafeHtml(subscription.name),
                    this.createSubscriptionCard(subscription),
                    this.SUBSCRIPTION_COLOR))
                .join('');
            const subscriptions = this.createAccordionCard('Subscriptions', inner, this.SUBSCRIPTION_COLOR);
            accordionCards += subscriptions;
        }

        if (requisitionModel.requisitions && requisitionModel.requisitions.length > 0) {
            const inner = requisitionModel.requisitions
                .map(requisition => this.createAccordionCard(HtmlReportFormatter.escapeToSafeHtml(requisition.name),
                    this.createRequisitionCard(requisition),
                    this.REQUISITION_COLOR))
                .join('');
            const requisitions = this.createAccordionCard('Requisitions', inner, this.REQUISITION_COLOR);
            accordionCards += requisitions;
        }

        return accordionCards;
    }

    private createPublisherCard(publisherReport: PublisherModel): string {
        let body = this.createTestAccordionCard(publisherReport, this.PUBLISHER_COLOR);
        if (publisherReport.messageReceived) {
            body += this.createAccordionCard('Message received',
                `<pre class="p-0 m-0" style="background-color: lightgray"><code>${JSON.stringify(publisherReport.messageReceived)}</code></pre>`,
                this.PUBLISHER_COLOR);
        }
        return body;
    }

    private createSubscriptionCard(subscriptionReport: SubscriptionModel): string {
        let body = this.createTestAccordionCard(subscriptionReport, this.SUBSCRIPTION_COLOR);
        if (subscriptionReport.messageReceived) {
            body += this.createAccordionCard('Message received',
                `<pre class="p-0 m-0" style="background-color: lightgray"><code>${JSON.stringify(subscriptionReport.messageReceived)}</code></pre>`,
                this.SUBSCRIPTION_COLOR);
        }
        return body;
    }

    private createTestAccordionCard(report: any, color: string) {
        const testAnalyzer = new TestsAnalyzer(report);
        const testsNumber = testAnalyzer.getTests().length;

        if (testsNumber > 0) {
            const percentage = testAnalyzer.getPercentage();
            let title = `${testAnalyzer.getPassingTests().length}/${testsNumber} (${percentage}%)`;
            if (report.time) {
                const totalTime = report.time.totalTime;
                title += ` ${totalTime}ms`;
            }
            return this.createAccordionCard(`<span>Tests</span><span class="float-right">${title}</span>`,
                this.createTestTable(testAnalyzer.getTests()), color);
        }
        return '';
    }

    private createAccordionCard(title: string, body: string, color: string) {
        const parentId = 'id' + new StringRandomCreator().create(10);
        const collapsibleId = 'id' + new StringRandomCreator().create(10);
        return `<div class='card bg-dark mb-0'>
            <div class='card-header' id='${parentId}' style='background-color: ${color}'>
                <a href='#' class='text-white mb-0' data-toggle='collapse' data-target='#${collapsibleId}' style='text-decoration: none;'>
                    <h6>${title}</h6>
                </a>
            </div>
            <div id='${collapsibleId}' class='collapse' data-parent='#${parentId}'>
              <div class='card-body px-1 py-2'>
                ${body}
              </div>
            </div>
        </div>`;
    }

    private createTestTable(tests: Test[]): string {
        return `<table class='table table-sm table-striped table-hover table-dark'>
                  <thead>
                    <tr>
                      <th style="word-break:break-all;" scope='col'>#</th>
                      <th style="word-break:break-all;" scope='col'>Hierarchy</th>
                      <th style="word-break:break-all;" scope='col'>Name</th>
                      <th style="word-break:break-all;" scope='col'>Description</th>
                      <th style="word-break:break-all;" scope='col'>Valid</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tests.map((test: Test, index: number) => {
            return `<tr>
                      <th scope='row'>${index + 1}</th>
                      <td style="word-break:break-all;">${test.hierarchy
                .filter((hierarchy: string, index: number) => index > 0)
                .map((hierarchy: string) => HtmlReportFormatter.escapeToSafeHtml(hierarchy))
                .join(' &gt; ')}</td>
                      <td style="word-break:break-all;">${HtmlReportFormatter.escapeToSafeHtml(test.test.name)}</td>
                      <td style="word-break:break-all;">${HtmlReportFormatter.escapeToSafeHtml(test.test.description)}</td>
                      <td style="word-break:break-all;"
                        class='${test.test.valid ? 'bg-success' : 'bg-danger'} text-center' >${test.test.valid}</td>
                    </tr>`;
        }).join('')}
                  </tbody>
                </table>`;
    }

    private createFullHtml(body: string): string {
        return `<!doctype html>
<html lang='en'>
  <head>
    <!-- Required meta tags -->
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
    <!-- Bootstrap CSS -->
    <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
        integrity='sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO' crossorigin='anonymous'>
    <title>Enqueuer Rocks</title>
  </head>
  <body style="background-color: lightgray">
    <div class='container-fluid'>
        <div class='text-center'>
            <img src='https://raw.githubusercontent.com/lopidio/enqueuer/develop/docs/images/fullLogo1.png' alt="enqueuer logo"
            style='width:30%; height: auto'>
        </div>
        ${body}
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src='https://code.jquery.com/jquery-3.3.1.slim.min.js'
        integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js'
        integrity='sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49' crossorigin='anonymous'></script>
    <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
        integrity='sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy' crossorigin='anonymous'></script>
  </body>
</html>`;
    }
}

export function entryPoint(mainInstance: MainInstance): void {
    mainInstance.reportFormatterManager.addReportFormatter(() => new HtmlReportFormatter(), 'html');
}
