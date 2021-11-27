import { RideType } from './types';

export enum RideStatus {
	CLOSED,
	OPEN,
	TESTING,
	SIMULATING,
}

export enum RideDemolishModifyType {
	DEMOLISH,
	REFURBISH,
}

export function rideSetStatus(ride: Ride, status: RideStatus) {
	context.executeAction(
		'ridesetstatus',
		{
			ride: ride.id,
			status,
		},
		() => {}
	);
}

export const closeRide = (ride: Ride) => rideSetStatus(ride, RideStatus.CLOSED);
export const openRide = (ride: Ride) => rideSetStatus(ride, RideStatus.OPEN);

export function closeAndEmptyRide(ride: Ride) {
	closeRide(ride);
	closeRide(ride);
}

export function refurbishRide(ride: Ride) {
	closeAndEmptyRide(ride);

	context.executeAction(
		'ridedemolish',
		{
			ride: ride.id,
			modifyType: RideDemolishModifyType.REFURBISH,
		},
		() => {}
	);

	openRide(ride);
}

// export function calculateTotalRefurbishCost() {
// 	context.queryAction(
// 		'ridedemolish',
// 		{
// 			ride: ride.id,
// 			modifyType: RideDemolishModifyType.REFURBISH,
// 		},
// 		(result) => {
// 			result.cost ?? 0
// 		}
// 	);
// }

const NonRefurbishableRides = [
	RideType.RIDE_TYPE_CASH_MACHINE,
	RideType.RIDE_TYPE_DODGEMS,
	RideType.RIDE_TYPE_DRINK_STALL,
	RideType.RIDE_TYPE_FIRST_AID,
	RideType.RIDE_TYPE_FOOD_STALL,
	RideType.RIDE_TYPE_INFORMATION_KIOSK,
	RideType.RIDE_TYPE_SHOP,
	RideType.RIDE_TYPE_TOILETS,
];

export function isRefurbishable(ride: Ride) {
	return ride.age > 0 && NonRefurbishableRides.indexOf(ride.type) === -1;
}
