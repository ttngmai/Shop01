import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VscAdd } from 'react-icons/vsc';
import palette from '../../lib/styles/palette';

const UploadBoxBlock = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${palette.gray[0]};
`;

const Item = styled.li`
  position: relative;
  width: 25%;
  height: 0;
  padding-bottom: ${(props) => (props.isDragging ? 0 : `18.75%`)};
  border: 2px dashed ${palette.gray[6]};
  margin: 2px;
  background: white;
`;

const InputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  input {
    display: none;
  }
`;

const UploadBox = ({ images, onChange, onChangeFile }) => {
  return (
    <DragDropContext onDragEnd={onChange}>
      <Droppable droppableId="images" direction="horizontal">
        {(provided) => (
          <UploadBoxBlock ref={provided.innerRef} {...provided.droppableProps}>
            {images &&
              images.map(({ id, imageBase64 }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    >
                      <InputLabel>
                        {imageBase64 ? (
                          <img src={imageBase64} alt="uploaded" />
                        ) : (
                          <VscAdd size="2rem" color={palette.gray[6]} />
                        )}
                        <input type="file" name={id} onChange={onChangeFile} />
                      </InputLabel>
                    </Item>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </UploadBoxBlock>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default UploadBox;
