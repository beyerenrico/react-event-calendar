// Create higher order component which makes the component draggable
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Slot } from "@radix-ui/react-slot";

type IsDraggableProps = {
  children: React.ReactNode;
  id: string;
  asChild?: boolean;
}

export const Draggable: React.FC<IsDraggableProps> = ({ children, id, asChild = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform
  } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform)
  };

  const Comp = asChild ? Slot : "div"

  return (
    <Comp ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </Comp>
  );
};
