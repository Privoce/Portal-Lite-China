import { useEffect, useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
const GET_ROOM_LIST = gql`
  query RoomList {
    portal_room {
      active
      name
      id
      members
      windows {
        id
        title
        tabs {
          id
          title
          icon
          url
          window
        }
      }
      creator
      id
    }
  }
`;
function useRoomList(username) {
  const [filtered, setFiltered] = useState([]);
  const [loadRoomList, { loading, data, error }] = useLazyQuery(GET_ROOM_LIST, {
    pollInterval: 10000
  });
  useEffect(() => {
    if (username) {
      loadRoomList();
    }
  }, [username]);
  useEffect(() => {
    if (data && username) {
      let rooms = data?.portal_room;
      // let tmps = rooms.filter((r) => {
      //   return r.host == username || (r.members && r.members.some((m) => m.username == username));
      // });
      console.log({ rooms });
      setFiltered(rooms);
    }
  }, [data, username]);
  return {
    username,
    data: filtered,
    loading: loading,
    error
  };
}

export default useRoomList;
