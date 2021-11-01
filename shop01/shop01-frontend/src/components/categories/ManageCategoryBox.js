import React, { useState, useEffect, useRef } from 'react';
import useMeasure from 'react-use-measure';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import WhiteBox from '../common/WhiteBox';
import ManageCategoryButtonsContainer from '../../containers/categories/ManageCategoryButtonsContainer';
import CreateCategoryButtonContainer from '../../containers/categories/CreateCategoryButtonContainer';
import { CgChevronRight, CgFolder } from 'react-icons/cg';
import { VscDash } from 'react-icons/vsc';

const CreateCategoryButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const AccordionBlock = styled.div`
  width: 100%;
`;

const ManageCategoryBoxBlock = styled.div`
  & > ${AccordionBlock} {
    padding: 0.5rem;
    border-radius: 4px;
    background: white;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  }
`;

const AccordionItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const AccordionItemHeading = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  background-color: white;
  color: black;
  transition: ease-in-out 0.2s all;
  cursor: pointer;

  &:hover {
    padding-left: 0.25rem;
    background-color: ${palette.indigo[1]};
  }

  span {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cgChevronRight {
    transition: all 0.35s ease;

    &[aria-expanded='true'] {
      transform: rotateZ(90deg);
    }
  }

  & > svg {
    flex-basis: 1rem;
    flex-shrink: 0;
    margin-right: 0.5rem;
  }
`;

const AccordionItemContent = styled(animated.div)`
  background-color: #f0f5f9;
  overflow: hidden;
`;

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => (ref.current = value), [value]);
  return ref.current;
}

const AccordionItem = React.memo(({ category, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const previous = usePrevious(isOpen);
  const [ref, { height: viewHeight }] = useMeasure();
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : -20,
    },
  });

  return (
    <AccordionItemBlock>
      <AccordionItemHeading
        onClick={handleToggle}
        style={{ paddingLeft: `${category.depth * 0.5}rem` }}
      >
        {category.children ? (
          <CgChevronRight
            className="cgChevronRight"
            size="1rem"
            aria-expanded={isOpen}
          />
        ) : (
          <VscDash size="1rem" />
        )}
        <CgFolder size="1rem" />
        <span>{category.name}</span>
        <ManageCategoryButtonsContainer category={category} />
      </AccordionItemHeading>
      <AccordionItemContent
        aria-expanded={!isOpen}
        style={{
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height,
        }}
      >
        <animated.div ref={ref} style={{ y }} children={children} />
      </AccordionItemContent>
    </AccordionItemBlock>
  );
});

const Accordion = React.memo(({ categories }) => {
  return (
    <AccordionBlock>
      {categories &&
        categories.map((category) => (
          <AccordionItem key={category.id} category={category}>
            {category.children && <Accordion categories={category.children} />}
          </AccordionItem>
        ))}
    </AccordionBlock>
  );
});

const ManageCategoryBox = ({ categories }) => {
  return (
    <ManageCategoryBoxBlock>
      <WhiteBox>
        <CreateCategoryButtonBox>
          <CreateCategoryButtonContainer />
        </CreateCategoryButtonBox>
        <Accordion categories={categories} />
      </WhiteBox>
    </ManageCategoryBoxBlock>
  );
};

export default ManageCategoryBox;
