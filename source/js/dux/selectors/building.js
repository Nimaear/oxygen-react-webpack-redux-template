import { createSelector } from 'reselect';

const getSeatById = (seats, id, merge) => {
  return {
    ...seats[id],
    ...merge,
  };
};

const getRoomById = (rooms, seats, id, merge) => {
  const extra = {
    buildingIndex: rooms[id].buildingIndex,
    floorIndex: rooms[id].floorIndex,
    roomIndex: rooms[id].roomIndex,
  };
  return {
    ...rooms[id],
    ...merge,
    seats: rooms[id].seats.map(seatId => getSeatById(seats, seatId, extra)),
  };
};

const getFloorById = (floors, rooms, seats, id, merge) => {
  const extra = {
    buildingIndex: floors[id].buildingIndex,
    floorIndex: floors[id].floorIndex,
  };
  return {
    ...floors[id],
    ...merge,
    rooms: floors[id].rooms.map(roomId => getRoomById(rooms, seats, roomId, extra)),
  };
};

const getBuildingById = (buildings, floors, rooms, seats, id, merge) => {
  const extra = {
    buildingIndex: buildings[id].buildingIndex,
  };
  return {
    ...buildings[id],
    ...merge,
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
    (state, projectId) => state.entities.project[projectId],
    (state) => state.entities.building,
    (state) => state.entities.floor,
    (state) => state.entities.room,
    (state) => state.entities.seat,
    (project, buildings, floors, rooms, seats) => {
      const ids = project.buildings;
      return ids.map(id => getBuildingById(buildings, floors, rooms, seats, id));
    }
  );
};

export const getBuildings = makeGetBuildings();
