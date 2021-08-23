import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CgAdd } from 'react-icons/cg';
import palette from '../../lib/styles/palette';

const ImagesBlock = styled.ul`
  display: flex;
  justify-content: center;
  background-color: ${palette.gray[0]};
`;

const Item = styled.li`
  width: 200px;
  height: 200px;
  border: 2px dashed ${palette.gray[6]};
  margin: 2px;
  background: white;
`;

const InputLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const UploadBox = ({ images, onChange, onChangeFile }) => {
  return (
    <DragDropContext onDragEnd={onChange}>
      <Droppable droppableId="images" direction="horizontal">
        {(provided) => (
          <ImagesBlock
            className="images"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {images &&
              images.map(({ id, imageBase64 }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <InputLabel>
                        {imageBase64 ? (
                          <img
                            src={imageBase64}
                            alt="uploaded"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                          />
                        ) : (
                          <CgAdd style={{ fontSize: '3rem' }} />
                        )}
                        <input
                          key={id}
                          type="file"
                          name={id}
                          onChange={onChangeFile}
                          style={{ display: 'none' }}
                        />
                      </InputLabel>
                    </Item>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </ImagesBlock>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default UploadBox;
