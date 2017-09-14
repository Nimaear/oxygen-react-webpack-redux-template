import { createSelector } from 'reselect';

const getSeatById = (seats, id) => {
  return {
    ...seats[id],
  };
};

const getRoomById = (rooms, seats, id) => {
  return {
    ...rooms[id],
    seats: rooms[id].seats.map(seatId => getSeatById(seats, seatId)),
  };
};

const getFloorById = (floors, rooms, seats, id) => {
  return {
    ...floors[id],
    rooms: floors[id].rooms.map(roomId => getRoomById(rooms, seats, roomId)),
  };
};

const getBuildingById = (buildings, floors, rooms, seats, id) => {
  return {
    ...buildings[id],
    floors: buildings[id].floors.map(floorId => getFloorById(floors, rooms, seats, floorId)),
  };
};


const makeGetBuilding = () => {
  return createSelector(
    (state) => state.entities,
    (state, id) => id,
    (entities, id) => {
      return getBuildingById(entities, id);
    }
  );
};

export const getBuilding = makeGetBuilding();

const makeGetBuildings = () => {
  return createSelector(
    (state) => state.entities.building,
    (state) => state.entities.floor,
    (state) => state.entities.room,
    (state) => state.entities.seat,
    (state) => state.currentEntities.buildings,
    (buildings, floors, rooms, seats, ids) => {
      return ids.map(id => getBuildingById(buildings, floors, rooms, seats, id));
    }
  );
};

export const getBuildings = makeGetBuildings();
