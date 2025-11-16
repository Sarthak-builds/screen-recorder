export interface Event {
  timestamp: Date;
  type: string;
  description?: string;
  text?: string;
  screenshot?: string;
}