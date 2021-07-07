import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';

const StyledBox = styled.div`
  font-size: 1.2rem;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #333;
  padding: 0.2rem;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    .input {
      border: none;
      padding: 0.2rem 0.4rem;
      border-radius: 0.3rem;
      margin-bottom: 0.2rem;
    }
    .btns {
      display: flex;
      .btn {
        color: #fff;
        padding: 0.4rem;
      }
    }
  }
`;
const ADD_ROOM = gql`
  mutation AddRoom(
    $creator: String!
    $host: String!
    $id: String!
    $name: String!
  ) {
    insert_portal_room(
      objects: { creator: $creator, host: $host, id: $id, name: $name }
    ) {
      returning {
        id
        name
        host
        active
        members
      }
    }
  }
`;
export default function AddRoom({ username, togglePopupVisible }) {
  const [addRoom] = useMutation(ADD_ROOM);
  const [values, setValues] = useState({
    id: Math.random().toString(36).substring(7),
    host: username,
    creator: username
  });
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log({ values });
    let rt = await addRoom({
      variables: {
        ...values
      }
    });
    if (rt) {
      togglePopupVisible();
    }
    console.log({ rt });
  };
  const handleChange = (evt) => {
    const { target } = evt;
    let { name, value } = target;
    setValues((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };
  const { name } = values;
  return (
    <StyledBox>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input name"
            placeholder="Room Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          {/* <input
            type="text"
            className="input link"
            placeholder="Link"
            name="link"
            value={link}
            onChange={handleChange}
          /> */}
          {/* <input type="hidden" name="id" value={id} />
          <input type="hidden" name="cid" value={cid} />
          <input type="hidden" name="creator" value={creator} />
          <input type="hidden" name="host" value={creator} /> */}
          <div className="btns">
            <button type="submit" className="btn submit">
              Create
            </button>
            <button className="btn close" onClick={togglePopupVisible}>
              Close
            </button>
          </div>
        </form>
      </div>
    </StyledBox>
  );
}
