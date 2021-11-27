import { UI_CLASSIFICATION } from './constants';
import windowDesc from './uiWIndow';

registerPlugin({
	name: 'refurbish-manager',
	version: '1.0',
	authors: ['MilesWells'],
	type: 'remote',
	licence: 'ISC',
	targetApiVersion: 34,
	main: () => {
		if (typeof ui !== 'undefined') {
			ui.registerMenuItem('Refurbish Manager', () => {
				const window = ui.getWindow(UI_CLASSIFICATION);
				if (window) window.bringToFront();
				else ui.openWindow(windowDesc);
			});
		}
	},
});
