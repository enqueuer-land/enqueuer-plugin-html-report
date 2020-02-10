export class HtmlTemplate {
    public static createFullHtml(options: any): string {
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
                <style>
                    :root {
                         --nqr-html-requisition-color: #FFE6A7;
                         --nqr-html-publisher-color: #D4F2DB; /*#5e64c3; /*#6A8D73*/;
                         --nqr-html-subscription-color: #C4BCF2; /*c86ba6;*/
                         --nqr-html-ignored-test-color: #d7ba53;
                         --nqr-html-passing-test-color: #9FB630;
                         --nqr-html-failing-test-color: #a9524a;
                         --nqr-html-invalid-color: #a9524a;
                         --nqr-html-enqueuer-color: #9FB630;
                         --nqr-html-text-color: #eeeeee;
                         --nqr-html-text-smooth-color: #a4a4a4;
                         --nqr-html-header-background-color: #2b2a2e;
                         --nqr-html-header-background-darker-color: #201f21;
                         --nqr-html-background-color: #353535;
                         --nqr-html-background-alternative-color: #424242;
                    }

                    .enqueuer-header {
                        background-color: var(--nqr-html-header-background-color);
                    }

                    .enqueuer-header-title {
                        font-size: 0.8em;
                        text-align: right;
                        font-weight: lighter;
                        color: var(--nqr-html-text-smooth-color);
                    }

                   .enqueuer-header-tag {
                        font-size: 0.9em;
                        text-align: right;
                    }

                    .action-button {
                        transition: all ease 250ms;
                    }

                    .action-button:hover {
                        transform: scale(1.5) rotate(10deg);
                    }

                    .breadcrumb-item:nth-child(1)::before {
                        display: none !important;
                    }
                    .breadcrumb-item::before {
                        content: '̷';
                        color: var(--nqr-html-text-smooth-color);
                        padding: 0 4px;
                    }
                    .breadcrumb-item {
                        font-size: 14px;
                        padding-left: 2px;
                    }
                    .test-item {
                        font-size: 16px;
                        color: var(--nqr-html-text-smooth-color);
                        border-bottom: 1px solid var(--nqr-html-background-alternative-color);
                    }
                    .test-item:hover {
                        color: var(--nqr-html-text-color);
                        background-color: var(--nqr-html-background-alternative-color);
                    }
                    .description-class {
                        font-size: 0.9em;
                        font-weight: lighter;
                        min-height: 32px;
                        margin-left: 20px;
                        padding-bottom: 10px;
                    }
                    .test-name-class {
                        padding-left: 1px;
                        border-top: 1px solid var(--nqr-html-background-alternative-color);
                        min-height: 50px;
                        background-color: var(--nqr-html-background-color);
                        color: var(--nqr-html-text-smooth-color);
                        font-weight: lighter;
                        font-size: 14px;
                    }
                    .description-class:hover, .description-class:active, .test-name-class:hover, .test-name-class:active {
                    }
                </style>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
                    integrity="sha256-+N4/V/SbAFiW1MPBCXnfnP9QSN3+Keu+NlB+0ev/YKQ=" crossorigin="anonymous"/>
                <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
              </head>
              <body style="background-color: var(--nqr-html-background-color)">
                <div id="app">
                    <div class='enqueuer-header pt-3 pb-2' style="text-align: center">
                        <img src='https://raw.githubusercontent.com/enqueuer-land/enqueuer/master/docs/images/fullLogo3.png' alt="enqueuer logo"
                        style='width:20%; height: auto'>


                    <div class='container pt-1'>
                        <div class="mx-auto">
                            <div class="row no-gutters pt-1  justify-content-between">
                                <button type="button" class="btn col-auto my-2 px-2 ml-2 test-badge" :style="testBadgeStyle">
                                    {{options.valid ? 'PASS' : 'FAIL'}}
                                </button>
                                <span class="col align-self-center pl-3 result-name scroll-div" :style="resultNameStyle">
                                    {{options.report.name}}
                                </span>

                               <div class="col-auto align-self-center pt-3 pr-3">
                                    <span class="enqueuer-header-title px-1">
                                        Tests:
                                    </span>
                                    <span class="enqueuer-header-tag" :style="{color: options.valid? 'var(--nqr-html-passing-test-color)': 'var(--nqr-html-failing-test-color)'}">
                                        {{options.summary}}
                                    </span>
                                    <span v-if="options.ignoredTestsLength > 0" class="enqueuer-header-tag" style="margin-left: 1px; color: var(--nqr-html-ignored-test-color)">
                                        - {{options.ignoredTestsLength}} ignored
                                    </span>
                                </div>
                                <div class="col-auto align-self-center pt-3">
                                    <span class="enqueuer-header-title">
                                        Time:
                                    </span>
                                    <span class="enqueuer-header-tag pr-3" :style="{color: options.valid? 'var(--nqr-html-passing-test-color)': 'var(--nqr-html-failing-test-color)'}">
                                        {{options.totalTime}}
                                    </span>
                                </div>
                            </div>


                            <div class="row no-gutters pt-1">
                                <div class="pl-1 col-auto pr-1 align-self-center pt-1 align-self-end">
                                    <span v-for="actionButton in options.actionButtons" @click="actionButtonClicked(actionButton)"
                                        :style="actionButtonStyle(actionButton)" class="action-button px-1">
                                        <i :class="actionButton.icon"></i>
                                    </span>
                                </div>
                            </div>

                      </div>
                      </div>
                    </div>
                    <div class='container mt-1'>
                        <div class="mx-auto">
                            <div v-for="(test, index) in filteredTests" class="ml-2 pb-1 test-item" :style="testItemStyle(test)"
                                data-toggle="collapse" :data-target="'#' + test.id">

                                <div class="row no-gutters">
                                    <div class="col">
                                        <div class="mx-3">
                                            <div class="px-0 pt-1">
                                                <ol class="breadcrumb mb-0 p-0" style="background-color: transparent">
                                                    <li class="breadcrumb-item" v-for="(breadCrumb, index) in test.hierarchy" :key="index">
                                                        <span class="breadcrumb-anchor">
                                                            {{breadCrumb.name}}
                                                        </span>
                                                    </li>
                                                </ol>
                                                <div v-if="test.hierarchy === null || test.hierarchy.length === 0"
                                                     style="height: 12px"></div>
                                            </div>
                                            <div class="pl-1 pt-1" style="text-align: left">
                                                {{test.name || "Skipped"}}
                                            </div>
                                        </div>
                                        <div :id="test.id" class="collapse" v-if="test.description">
                                            <ul class="p-0 m-0 list-unstyled">
                                                <li class="description-class pt-1 pl-2">
                                                    {{test.description}}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="col-auto align-self-center pr-2" style="font-size: 0.85em">
                                        #{{index + 1}}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <script>
                new Vue({
                    el: '#app',
                    data() {
                        const data = {
                            options: ${options},
                            stringFilter: '',
                        };
                        data.options.actionButtons.forEach(actionButton => data[actionButton.propertyFilterName] = actionButton.active);
                        return data;
                    },
                    methods: {
                      actionButtonClicked(actionButton) {
                          this[actionButton.propertyFilterName] = !this[actionButton.propertyFilterName];
                          actionButton.active = this[actionButton.propertyFilterName];
                          this[actionButton.propertyFilterName] = actionButton.active;
                      }
                    },
                    computed: {
                        filteredTests() {
                            console.log(this.showIgnoredTests)
                            const stringFilterLowerCase = this.stringFilter.toLowerCase();
                            return this.options.flattenTests
                                .filter(test => (this.showPassingTests && test.valid === true && (test.ignored === undefined || test.ignored === false)) ||
                                    (this.showFailingTests && test.valid === false && (test.ignored === undefined || test.ignored === false)) ||
                                    (this.showIgnoredTests && test.ignored === true))
                                .filter(test => test.name.toLowerCase().indexOf(stringFilterLowerCase) !== -1 ||
                                    (test.description.toLowerCase() || '').indexOf(stringFilterLowerCase) !== -1 ||
                                    test.hierarchy.some(hierarchy => hierarchy.name.toLowerCase().indexOf(stringFilterLowerCase) !== -1));
                        },
                        testBadgeStyle() {
                            return {
                                'background-color': this.options.valid ? 'var(--nqr-html-passing-test-color)' : 'var(--nqr-html-failing-test-color)',
                                'color': 'var(--nqr-html-header-background-color)',
                                'font-size': '25px',
                                'font-weight': 'bold'
                            }
                        },
                        resultNameStyle() {
                            return {
                                'text-align': 'left',
                                'font-size': '35px',
                                'max-height': '50px',
                                color: this.options.valid ? 'var(--nqr-html-passing-test-color)' : 'var(--nqr-html-failing-test-color)',
                            }
                        },
                        actionButtonStyle() {
                          return function(actionButton) {
                            const style = {
                                cursor: 'pointer',
                                color: 'var(--nqr-html-text-smooth-color)',
                                'font-size': '20px'
                            };
                            if (actionButton.active) {
                                style.color = actionButton.color;
                                style['font-size'] = '25px';
                            }
                            return style
                          }
                        },
                        testItemStyle() {
                             return function (test) {
                                const style = {
                                    cursor: 'pointer'
                                };
                                if (test.ignored) {
                                    style['border-left'] = '6px var(--nqr-html-ignored-test-color) solid';
                                } else if (test.valid) {
                                    style['border-left'] = '6px var(--nqr-html-passing-test-color) solid';
                                } else {
                                    style['border-left'] = '6px var(--nqr-html-failing-test-color) solid';
                                }
                                return style;
                            }
                        }
                    }
                })
                </script>
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
