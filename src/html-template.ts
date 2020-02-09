export class HtmlTemplate {
    public static createFullHtml(flattenedTests: string): string {
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
                         --nqr-html-ignored-test-color: #c2a84a;
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

                    .breadcrumb-item:nth-child(1)::before {
                        display: none !important;
                    }
                    .breadcrumb-item::before {
                        content: '̷';
                        color: var(--nqr-html-text-smooth-color);
                        padding: 0 5px;
                    }
                    .breadcrumb-item {
                        font-size: 12px;
                        padding-left: 3px;
                    }
                    .test-item {
                        color: var(--nqr-html-text-smooth-color);
                    }
                    .test-item:hover {
                        color: var(--nqr-html-text-color);
                        background-color: var(--nqr-html-background-alternative-color);
                    }
                    /*.breadcrumb-item a:hover {*/
                    /*    text-decoration: none;*/
                    /*    color: var(--nqr-html-text-color);*/
                    }
                    .breadcrumb-anchor:hover, .breadcrumb-anchor.hover {
                        /*color: var(--text-color) !important;*/
                    }
                    .description-class {
                        font-size: 0.9em;
                        font-weight: lighter;
                        min-height: 32px;
                        /*border-bottom: 1px solid var(--stacker-header-background-color);*/
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
                <div class='enqueuer-header py-5' style="text-align: center">
                    <img src='https://raw.githubusercontent.com/enqueuer-land/enqueuer/master/docs/images/fullLogo3.png' alt="enqueuer logo"
                    style='width:30%; height: auto'>
                </div>
                <div class='container mt-1'>
                    <div id="app" class="mx-auto">
                        <div v-for="(test, index) in flattenedTests" class="pb-3 test-item" :style="testItemStyle(test)">


                            <div class="row no-gutters">
                                <div class="col" data-toggle="collapse" :data-target="'#' + test.id">
                                    <div class="ml-1" style="cursor: pointer;">
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
                                        <div class="pl-1 pt-1">
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
                                <div class="col-md-auto align-self-center pr-2"
                                     style="font-size: 0.75em">
                                    #{{index + 1}}
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
                <script>
                new Vue({
                    el: '#app',
                    data: {
                        flattenedTests: ${flattenedTests}
                    },
                    computed: {
                        testItemStyle() {
                             return function (test) {
                                const style = {};
                                if (test.valid) {
                                    style['border-left'] = '4px var(--nqr-html-passing-test-color) solid';
                                } else if (test.ignored) {
                                    style['border-left'] = '4px var(--nqr-html-ignored-test-color) solid';
                                } else {
                                    style['border-left'] = '4px var(--nqr-html-failing-test-color) solid';
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