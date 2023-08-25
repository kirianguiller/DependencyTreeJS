import { SentenceSVG } from './SentenceSVG';
import { lightStylesheet } from './StylesheetHandler';

function getSVGBlob(sentenceSVG: SentenceSVG) {
  let svgString = sentenceSVG.snapSentence.toString();

  svgString = svgString.replace(/<desc>Created with Snap<\/desc>/g, '<desc>Created with Snap on Arborator</desc>');
  svgString = svgString.replace(/>/g, '>\n');

  const style = `<style>${lightStylesheet} svg {background-color: white}</style> `;
  svgString = svgString.replace(/(<svg.*>)/, `$1\n${style}`);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });

  return svgBlob;
}

export function exportSVG(sentenceSVG: SentenceSVG, title: string) {
  const svgBlob = getSVGBlob(sentenceSVG);
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = title;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export function exportPNG(sentenceSVG: SentenceSVG, title: string) {
  const svgBlob = getSVGBlob(sentenceSVG);
  const svgUrl = URL.createObjectURL(svgBlob);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = title;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  img.src = svgUrl;
}
