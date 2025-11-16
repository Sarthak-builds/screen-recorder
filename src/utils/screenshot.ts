import html2canvas from "html2canvas";

let lastCaptureTimee = 0;
const THROTTLE_DELAY = 700;

export const captureScreenshot = async () : Promise<string | null> => {
    const now = Date.now();
    if(now - lastCaptureTimee < THROTTLE_DELAY) {
        return null;
    }
    try {
        const canvas = await html2canvas(document.body, {
            useCORS:true,
            logging:false,
        });
        const dataUrl = canvas.toDataURL('image/png');
        lastCaptureTimee = now;
        return dataUrl;
    } catch (err) {
        console.error("Screenshot failed:", err);
        return null;
    }
}