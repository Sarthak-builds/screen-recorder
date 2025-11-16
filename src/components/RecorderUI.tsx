import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { captureScreenshot } from '../utils/screenshot';

export default function RecorderUI() {
  const [isRecording, setIsRecording] = useState(false);
  const [events, setEvents] = useState<{ timestamp: Date; type: string; description?: string; text?: string; screenshot?: string }[]>([]);
  const handleStart = async () => {
    if (!isRecording) {
      setIsRecording(true);
      const screenshot = await captureScreenshot();
      if (screenshot) {
        setEvents([{ timestamp: new Date(), type: 'start', screenshot }]);
      }
      document.addEventListener('click', handleClick, true);
      document.addEventListener('keydown', handleKeydown, true);
      document.addEventListener('input', handleInput, true);
      document.addEventListener('blur', handleBlur, true);
      document.addEventListener('submit', handleSubmit, true);
    }
  };

  const handleStop = () => {
    if (isRecording) {
      setIsRecording(false);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('keydown', handleKeydown, true);
      document.removeEventListener('input', handleInput, true);
      document.removeEventListener('blur', handleBlur, true);
      document.removeEventListener('submit', handleSubmit, true);
    }
  };
  const handleClick = async (e: MouseEvent) => {
    if (isRecording && !(e.target as HTMLElement).closest('.recorder-ui')) {
      const screenshot = await captureScreenshot();
      if (screenshot) {
        setEvents((prev) => [
          ...prev,
          {
            timestamp: new Date(),
            type: 'click',
            description: `Click at (${e.clientX}, ${e.clientY}) on ${getElementDescription(e.target as HTMLElement)}`,
            screenshot,
          },
        ]);}}};
  const handleKeydown = async (e: KeyboardEvent) => {
    if (isRecording && ['Enter', 'Space', 'Escape', 'Tab'].includes(e.key)) {
      const screenshot = await captureScreenshot();
      if (screenshot) {
        setEvents((prev) => [...prev,
          { timestamp: new Date(), type: 'keydown', description: `Key: ${e.key}`, screenshot },
        ]);}}};

  const handleInput = (e: Event) => {
    if (isRecording && e.target instanceof HTMLElement) {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLElement;
    }
  };
  const handleBlur = () => {}; //confusion h ek.
 const handleSubmit = async (e: SubmitEvent) => {
    if (isRecording && e.target instanceof HTMLFormElement) {
      const form = e.target as HTMLFormElement;
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(async (input) => {
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
          const text = input.value || input.textContent || '';
          if (text) {
            const screenshot = await captureScreenshot();
            if (screenshot) {
              setEvents((prev) => [
                ...prev,
                {
                  timestamp: new Date(),
                  type: 'form_submit',
                  description: `Form submitted, input on ${getElementDescription(input)}`,
                  text,
                  screenshot,
                },
              ]);} }
        }});}}; 

  const getElementDescription = (element: HTMLElement): string => {
    const tag = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : '';
    const className = element.className ? `.${element.className.split(' ').join('.')}` : '';
    return `${tag}${id}${className}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto recorder-ui">
      <CardHeader>
        <CardTitle>Recorder Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleStart} disabled={isRecording}>
          Start Recording
        </Button>
        <Button onClick={handleStop} disabled={!isRecording}>
          Stop Recording
        </Button>
        <Button disabled={!events.length}>Generate PDF</Button>
        <Button disabled={!events.length}>Clear</Button>
      </CardContent>
    </Card>
  );
}