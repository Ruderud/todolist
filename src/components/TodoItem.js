import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import { useTodoDispatch } from "../TodoContext";
import reactDom from "react-dom";

const Remove = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
`;
const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid gray;
  font-size: 24px; //여기서는 아이콘의 크기를 의미한다
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #85e21a;
      color: #85e21a;
    `}
`;
const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;
const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;

  &:hover {
    //커서가 올라갔을때만 Remove가 opacity 0->1이되어 나타남
    ${Remove} {
      opacity: 1;
    }
  }
`;

function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();
  const onToggle = () =>
    dispatch({
      type: "TOGGLE",
      id,
    });
  const onRemove = () =>
    dispatch({
      type: "REMOVE",
      id,
    });

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem); //memo를 쓰면 리스트1,2,3,4중 2를 삭제해도 3,4가 리랜더링 되지않아서 효율적
