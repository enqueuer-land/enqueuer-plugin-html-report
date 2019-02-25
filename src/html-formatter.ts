import {MainInstance, PublisherModel, SubscriptionModel, RequisitionModel, ReportFormatter, TestsAnalyzer, Test} from 'enqueuer-plugins-template';
import {StringRandomCreator} from './string-random-creator';

export class HtmlReportFormatter extends ReportFormatter {

    public format(report: RequisitionModel): string {
        const body = this.createRequisitionCard(report);
        return this.createFullHtml(body);
    }

    private createRequisitionCard(requisitionModel: RequisitionModel): string {
        let accordionCards = this.createTestAccordionCard(requisitionModel);

        if (requisitionModel.publishers && requisitionModel.publishers.length > 0) {
            const inner = requisitionModel.publishers
                .map(publisher => this.createAccordionCard(publisher.name, this.createPublisherCard(publisher))).join('');
            const publishers = this.createAccordionCard('Publishers', inner, '#D4F2DB');
            accordionCards += publishers;
        }

        if (requisitionModel.subscriptions && requisitionModel.subscriptions.length > 0) {
            const inner = requisitionModel.subscriptions
                .map(subscription => this.createAccordionCard(subscription.name, this.createSubscriptionCard(subscription))).join('');
            const subscriptions = this.createAccordionCard('Subscriptions', inner, '#C4BCF2');
            accordionCards += subscriptions;
        }

        if (requisitionModel.requisitions && requisitionModel.requisitions.length > 0) {
            const inner = requisitionModel.requisitions
                .map(requisition => this.createAccordionCard(requisition.name, this.createRequisitionCard(requisition))).join('');
            const requisitions = this.createAccordionCard('Requisitions', inner, '#FFE6A7');
            accordionCards += requisitions;
        }

        return accordionCards;
    }

    private createPublisherCard(publisherReport: PublisherModel): string {
        let body = this.createTestAccordionCard(publisherReport);
        if (publisherReport.messageReceived) {
            body += this.createAccordionCard('Message received',
                `<pre><code>${JSON.stringify(publisherReport.messageReceived)}</code></pre>`);
        }
        return body;
    }

    private createSubscriptionCard(subscriptionReport: SubscriptionModel): string {
        let body = this.createTestAccordionCard(subscriptionReport);
        if (subscriptionReport.messageReceived) {
            body += this.createAccordionCard('Message received',
                `<pre><code>${JSON.stringify(subscriptionReport.messageReceived)}</code></pre>`);
        }
        return body;
    }

    private createTestAccordionCard(report: any) {
        const testAnalyzer = new TestsAnalyzer(report);
        const testsNumber = testAnalyzer.getTests().length;

        if (testsNumber > 0) {
            const percentage = testAnalyzer.getPercentage();
            let title = `${testAnalyzer.getPassingTests().length}/${testsNumber} (${percentage}%)`;
            if (report.time) {
                const totalTime = report.time.totalTime;
                title += ` ${totalTime}ms`;
            }

            return this.createAccordionCard('Tests' + title, this.createTestTable('', testAnalyzer.getTests()));
        }
        return '';
    }

    private createAccordionCard(title: string, body: string, color?: string) {
        const parentId = 'id' + new StringRandomCreator().create(10);
        const collapsibleId = 'id' + new StringRandomCreator().create(10);
        return `<div class='card bg-dark mb-0'>
            <div class='card-header' id='${parentId}' ${!color ? '' : 'style="background-color: ' + color + '"'}>
                <a href='#' class='text-white mb-0' data-toggle='collapse' data-target='#${collapsibleId}' style='text-decoration: none;'>
                    <h6>${title}</h6>
                </a>
            </div>
            <div id='${collapsibleId}' class='collapse' data-parent='#${parentId}'>
              <div class='card-body bg-light px-1 py-2'>
                ${body}
              </div>
            </div>
        </div>`;
    }

    private createTestTable(title: string, tests: Test[]): string {
        return `<h6 class='${tests.every(test => test.test.valid) ? 'text-success' : 'text-danger'} text-right' >${title}</h6>
                <table class='table table-sm table-striped table-hover table-dark'>
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
                .join(' › ')}</td>
                      <td style="word-break:break-all;">${test.test.name}</td>
                      <td style="word-break:break-all;">${test.test.description}</td>
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
  <body>
    <div class='container-fluid'>
        <div class='text-center'>
            <img src='https://raw.githubusercontent.com/lopidio/enqueuer/develop/docs/images/fullLogo1.png'
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
