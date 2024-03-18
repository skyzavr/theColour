import { DragEvent, ChangeEvent } from 'react';
export type DragEv = DragEvent<HTMLDivElement>;
export type ChangeEv = ChangeEvent<HTMLInputElement>;
type EventHandler = (event: DragEv) => void;

export type dragProps = {
  drag: boolean;
  uploadedImg: string | ArrayBuffer;
  dragStartHandler: EventHandler;
  dragLeaveHandler: EventHandler;
  dragHandler: EventHandler;
  fileSelectedHandler: (event: ChangeEv) => void;
};
