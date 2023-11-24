import jsPDF from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
import html2canvas from 'html2canvas';
const download = async (title) => {
  applyPlugin(jsPDF);
  const height = document.getElementById('recipelOnlyReadFormId').scrollHeight;
  html2canvas(document.getElementById('recipelOnlyReadFormId'), {
    backgroundColor: '#f1f5f8',
    scale: 3,
    height: height,
    windowHeight: height,
  }).then(function (canvas) {
    const pngData = canvas.toDataURL('image/jpeg', 1.0);
    const doc = new jsPDF('p', 'pt', 'a4');
    const aWidth = 595.28;
    const aHeight = 841.89;
    const pageHeight = (aHeight * canvas.width) / aWidth;
    const imgHeight = (aWidth * canvas.height) / canvas.width;
    let leftHeight = canvas.height;
    let position = 0;
    while (leftHeight > 0) {//高度超出A4纸高度时，需要遍历
      doc.addImage(pngData, 'JPEG', 0, position, aWidth, imgHeight);
      leftHeight -= pageHeight;
      position -= aHeight;
      if (leftHeight > 0) {//增加页面
        doc.addPage();
      }
    }
    doc.save(title + `处方.pdf`);
  });
}
export default download