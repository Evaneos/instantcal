import { create } from './browser/webSocket';
import { update } from './browser/app';

create();
update({isBusy : true});
