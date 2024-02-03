// Create higher order component which makes the component draggable
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {Slot} from "@radix-ui/react-slot";

type IsDroppableProps = {
  children: React.ReactNode;
  id: string | number;
  asChild?: boolean;
}

export const Droppable: React.FC<IsDroppableProps> = ({ children, id, asChild = false }) => {
  const {
    isOver,
    setNodeRef,
  } = useDroppable({ id });

  const style = {
    color: isOver ? 'green' : undefined,
  }

  const Comp = asChild ? Slot : "div"

  return (
    <Comp ref={setNodeRef} style={style}>
      {children}
    </Comp>
  );
};
