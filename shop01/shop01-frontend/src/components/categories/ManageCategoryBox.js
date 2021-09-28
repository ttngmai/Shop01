import React, { useState } from 'react';
import styled from 'styled-components';
import { CgChevronRight, CgFolder } from 'react-icons/cg';
import { VscDash } from 'react-icons/vsc';
import palette from '../../lib/styles/palette';
import CategoryEditButtonsContainer, {
  CreateButtonContainer,
} from '../../containers/categories/CategoryEditButtonsContainer';

const CreateButtonBlock = styled.div`
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

const AccordionItemContent = styled.div`
  background-color: #f0f5f9;
  overflow: hidden;

  &[aria-expanded='true'] {
    max-height: 0px;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
  }
`;

const AccordionItem = React.memo(({ category, children }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

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
            aria-expanded={isAccordionOpen}
          />
        ) : (
          <VscDash size="1rem" />
        )}
        <CgFolder size="1rem" />
        <span>{category.name}</span>
        <CategoryEditButtonsContainer category={category} />
      </AccordionItemHeading>
      <AccordionItemContent aria-expanded={!isAccordionOpen}>
        {children}
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
      <CreateButtonBlock>
        <CreateButtonContainer />
      </CreateButtonBlock>
      <Accordion categories={categories} />
    </ManageCategoryBoxBlock>
  );
};

export default ManageCategoryBox;
