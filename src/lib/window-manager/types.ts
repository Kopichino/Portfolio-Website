export type WindowId = string;

export interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
}
