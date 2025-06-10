import { MainInstance } from "enqueuer";
import { HtmlReportFormatter } from "./html-formatter";

export function entryPoint(mainInstance: MainInstance): void {
  mainInstance.reportFormatterManager.addReportFormatter(
    () => new HtmlReportFormatter(),
    "html"
  );
}
