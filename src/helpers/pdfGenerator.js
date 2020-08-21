import React from "react";
import PropTypes from "prop-types";
import JsPdf from "jspdf";
import html2canvas from "html2canvas";

const PdfGenerator = (props) => {
  const { children } = props;

  const toPdf = () => {
    const { targetRef, filename, x, y, options, onComplete } = props;
    const source = targetRef;
    const targetComponent = source.current || source;
    const backendURL = process.env.REACT_APP_BASE_URL; 
    if (!targetComponent) {
      throw new Error(
        "Target ref must be used or informed."
      );
    }
    html2canvas(targetComponent, {
      logging: false,
      useCORS: false,
      scale: props.scale,
      proxy: backendURL + "/helper/imageProxy",
      timeout: 0,
      allowTaint: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); 
      const pdf = new JsPdf(options);
      pdf.addImage(imgData, "JPEG", x, y);

      pdf.save(filename);
      if (onComplete) onComplete();
    }).catch(error => console.log(error));
  };

  return <>{children({ toPdf: toPdf })}</>;
};

PdfGenerator.propTypes = {
  filename: PropTypes.string.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  options: PropTypes.object,
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
  x: 0,
  y: 0,
  scale: 1,
  onComplete: undefined,
  targetRef: undefined
};

export default PdfGenerator;