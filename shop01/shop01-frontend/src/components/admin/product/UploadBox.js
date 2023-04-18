import React, { useCallback } from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { VscAdd } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io';

const UploadBoxBlock = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${palette.gray[0]};
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
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

const DeleteImageButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid ${palette.gray[3]};
  border-radius: 50%;
  background-color: white;
  cursor: pointer;

  &:hover svg {
    color: ${palette.red[7]};
  }
`;

const UploadBox = () => {
  const { control, setValue, watch, trigger } = useFormContext();
  const { fields, move, update } = useFieldArray({
    control,
    name: 'images',
  });

  const watchImages = watch('images');
  console.log(watchImages);

  const handleDragEnd = useCallback(
    ({ source, destination }) => {
      if (destination) {
        move(source.index, destination.index);
      }
    },
    [move],
  );

  const getBase64 = useCallback(
    (file, callback) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        callback(reader.result);
        trigger('images');
      };
      reader.onerror = (err) => {
        console.log(err);
      };
    },
    [trigger],
  );

  const handleChange = useCallback(
    (name, e) => {
      const file = e.currentTarget.files[0];
      getBase64(file, (result) => {
        setValue(name, { file: file, base64: result });
      });
    },
    [getBase64, setValue],
  );

  const handleDeleteImageButtonClick = useCallback(
    (index, e) => {
      e.stopPropagation();
      update(index, { image: null });
    },
    [update],
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="images" direction="horizontal">
        {(provided) => (
          <UploadBoxBlock ref={provided.innerRef} {...provided.droppableProps}>
            {fields.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={`image-${item.id}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <Item
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                  >
                    <InputLabel>
                      {watchImages[index].image ? (
                        <img
                          src={watchImages[index].image.base64}
                          alt="uploaded"
                        />
                      ) : (
                        <VscAdd size="2rem" color={palette.gray[6]} />
                      )}
                      <Controller
                        control={control}
                        name={`images.${index}.image`}
                        render={({ field: { ref } }) => (
                          <input
                            type="file"
                            onChange={(e) => {
                              handleChange(`images.${index}.image`, e);
                            }}
                            ref={ref}
                          />
                        )}
                      />
                    </InputLabel>
                    {watchImages[index].image && (
                      <DeleteImageButton
                        type="button"
                        onClick={(e) => handleDeleteImageButtonClick(index, e)}
                      >
                        <IoMdClose size="1rem" />
                      </DeleteImageButton>
                    )}
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
