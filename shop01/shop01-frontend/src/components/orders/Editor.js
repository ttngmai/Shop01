import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const EditorBlock = styled.div``;

const QuillWrapper = styled.div`
  .ql-editor {
    min-height: 320px;
    max-height: 320px;
    font-size: 1rem;
  }
`;

const Editor = ({ text, onChangeField }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ color: [] }, { background: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [
              { align: '' },
              { align: 'center' },
              { align: 'right' },
              { align: 'justify' },
            ],
            ['clean'],
          ],
        },
      },
      formats: [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'size',
        'color',
        'background',
        'list',
        'bullet',
        'align',
        'indent',
      ],
    });

    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'text', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  return (
    <EditorBlock>
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;
