import { createSelector } from 'reselect';

const getSeatById = (seats, id, merge) => {
  return {
    ...seats[id],
    ...merge,
  };
};

const getRoomById = (rooms, seats, id, merge) => {
  const extra = {
    nextBuildingId: rooms[id].nextBuildingId,
    nextFloorId: rooms[id].nextBuildingId,
    nextRoomId: rooms[id].nextRoomId,
  };
  return {
    ...rooms[id],
    ...merge,
    seats: rooms[id].seats.map(seatId => getSeatById(seats, seatId, extra)),
  };
};

const getFloorById = (floors, rooms, seats, id, merge) => {
  const extra = {
    nextBuildingId: floors[id].nextBuildingId,
    nextFloorId: floors[id].nextBuildingId,
  };
  return {
    ...floors[id],
    ...merge,
    rooms: floors[id].rooms.map(roomId => getRoomById(rooms, seats, roomId, extra)),
  };
};

const getBuildingById = (buildings, floors, rooms, seats, id) => {
  const extra = {
    nextBuildingId: buildings[id].nextBuildingId,
  };
  return {
    ...buildings[id],
    floors: buildings[id].floors.map(floorId => getFloorById(floors, rooms, seats, floorId, extra)),
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
    (state, projectId) => state.entities.project[projectId].buildings,
    (buildings, floors, rooms, seats, ids) => {
      return ids.map(id => getBuildingById(buildings, floors, rooms, seats, id));
    }
  );
};

export const getBuildings = makeGetBuildings();
