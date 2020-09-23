import React from "react";
import PropTypes from "prop-types";
import JsPdf from "jspdf";
import html2canvas from "html2canvas";

const PdfGenerator = (props) => {
  const { children } = props;

  const toPdf = () => {
    const { targetRef, filename, onComplete } = props;
    const source = targetRef;
    const targetComponent = source.current || source;
    const backendURL = process.env.REACT_APP_BASE_URL;
    const top_left_margin = 0;
    const resumeWidth = targetComponent.clientWidth;
    const resumeHeight = targetComponent.clientHeight;
    const pdfWidth = resumeWidth;
    const pdfHeight = (pdfWidth * 1.5);
    const canvas_image_width = resumeWidth;
    const canvas_image_height = resumeHeight;
    const totalPDFPages = Math.ceil(resumeHeight / pdfHeight) - 1;

    if (!targetComponent) {
      throw new Error(
        "Target ref must be used or informed."
      );
    }
    html2canvas(targetComponent, {
      logging: false,
      useCORS: false,
      proxy: backendURL + "/helper/imageProxy",
      timeout: 0,
      allowTaint: true,
    }).then((canvas) => {
      canvas.getContext('2d');
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new JsPdf('p', 'pt', [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([pdfWidth, pdfHeight]);
        pdf.addImage(imgData, 'JPG', top_left_margin, -(pdfHeight * i) + 15, canvas_image_width, canvas_image_height);
      }
      pdf.save(filename);
      if (onComplete) onComplete();
    }).catch(error => console.error(error));
  };

  return <>{children({ toPdf: toPdf })}</>;
};

PdfGenerator.propTypes = {
  filename: PropTypes.string.isRequired,
  scale: PropTypes.number,
  children: PropTypes.func.isRequired,
  onComplete: PropTypes.func,
  targetRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};


PdfGenerator.defaultProps = {
  filename: "download.pdf",
  scale: 1,
  onComplete: undefined,
  targetRef: undefined
};

export default PdfGenerator;