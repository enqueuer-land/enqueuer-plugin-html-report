import * as formatter from './html-formatter';
import {MainInstance} from 'enqueuer';

export function entryPoint(mainInstance: MainInstance): void {
    formatter.entryPoint(mainInstance);
}
