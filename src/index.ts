import { ACTION } from './constants';

enum RideStatus {
	CLOSED,
	OPEN,
	TESTING,
	SIMULATING,
}

function rideSetStatus(ride: Ride, status: RideStatus) {
	context.executeAction(
		'ridesetstatus',
		{
			ride: ride.id,
			status,
		},
		() => {}
	);
}

const closeRide = (ride: Ride) => rideSetStatus(ride, RideStatus.CLOSED);
const openRide = (ride: Ride) => rideSetStatus(ride, RideStatus.OPEN);

function closeAndEmptyRide(ride: Ride) {
	closeRide(ride);
	closeRide(ride);
}

function repairRide(ride: Ride) {
	closeAndEmptyRide(ride);

	context.executeAction(
		'ridedemolish',
		{
			ride: ride.id,
			modifyType: 1,
		},
		() => {}
	);

	openRide(ride);
}

registerPlugin({
	name: 'refurbish-manager',
	version: '1.0',
	authors: ['MilesWells'],
	type: 'remote',
	licence: 'ISC',
	targetApiVersion: 34,
	main: () => {
		// context.registerAction(
		// 	ACTION,
		// 	() => ({}),
		// 	() => ({})
		// );

		for (const ride of map.rides) {
			repairRide(ride);
		}
	},
});
