import { UI_CLASSIFICATION } from './constants';
import { isRefurbishable, refurbishRide } from './rideActions';

const width = 200;
const margin = 5;
const lineHeight = 14;
const linePadding = 2;
const buttonHeight = 2 * lineHeight + linePadding;

let y = 14 + margin; // header height + margin
function advance(dy: number) {
	const cursor = y;
	y += dy;
	return cursor;
}

function button(
	name: string,
	text: string,
	tooltip: string,
	onClick: () => void
): ButtonWidget {
	return {
		name,
		type: 'button',
		x: margin,
		y: advance(buttonHeight + linePadding),
		width: width - 2 * margin,
		height: buttonHeight,
		text: text,
		tooltip: tooltip,
		onClick: onClick,
	};
}

const widgets: Widget[] = [];

widgets.push(
	button(
		'refurbishAllRides',
		'Refurbish All Rides',
		'Closes, empties, refurbishes, and reopens all rides. Queues typically remain intact.',
		() => {
			map.rides.filter(isRefurbishable).forEach(refurbishRide);
		}
	)
);

const uiWindow: WindowDesc = {
	classification: UI_CLASSIFICATION,
	width,
	height: y - linePadding + margin,
	title: 'Refurbish Manager',
	widgets,
};

export default uiWindow;
