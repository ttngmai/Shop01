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

const AccordionHeading = styled.div`
  display: flex;
  align-items: center;
  position: relative;
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
    width: calc(100% - 6.5rem);
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

  .cgChevronRight,
  .vscDash,
  .cgFolder {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
`;

const AccordionContent = styled.div`
  background-color: #f0f5f9;
  overflow: hidden;

  &[aria-expanded='true'] {
    max-height: 0px;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
  }
`;

const AccordionItem = React.memo(({ category, children, depth }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <AccordionItemBlock>
      <AccordionHeading
        onClick={handleToggle}
        style={{ paddingLeft: `${(depth - 1) * 0.5}rem` }}
      >
        {category.children ? (
          <CgChevronRight
            className="cgChevronRight"
            aria-expanded={isAccordionOpen}
          />
        ) : (
          <VscDash className="vscDash" />
        )}
        <CgFolder className="cgFolder" />
        <span>{category.name}</span>
      </AccordionHeading>
      <CategoryEditButtonsContainer category={category} />
      <AccordionContent aria-expanded={!isAccordionOpen}>
        {children}
      </AccordionContent>
    </AccordionItemBlock>
  );
});

const Accordion = React.memo(({ categories, depth = 1 }) => {
  return (
    <AccordionBlock>
      {categories &&
        categories.map((category) => (
          <AccordionItem key={category.id} category={category} depth={depth}>
            {category.children && (
              <Accordion categories={category.children} depth={depth + 1} />
            )}
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
