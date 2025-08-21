import * as React from "react";

declare global {
  interface JQuery {
    modal(): void;
  }
}

type ModalProps = {
  id: string;
  children: React.ReactNode;
};

export default function Modal(props: ModalProps) {
  const { id, children } = props;

  return (
    <>
      <div id={id} className="modal">
        {children}
      </div>
    </>
  );
}

function useModal(props: ModalProps) {
  function open() {
    $(`#${props.id}`).modal();
  }

  return { node: <Modal {...props} />, open };
}

export { useModal };
