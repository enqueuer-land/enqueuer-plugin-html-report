import * as formatter from './html-formatter';
import {MainInstance} from 'enqueuer-plugins-template';

export function entryPoint(mainInstance: MainInstance): void {
    formatter.entryPoint(mainInstance);
}
