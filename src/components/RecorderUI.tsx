import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function RecorderUI() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Recorder Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button>Start Recording</Button>
        <Button>Stop Recording</Button>
        <Button>Generate PDF</Button>
        <Button>Clear</Button>
      </CardContent>
    </Card>
  );
}