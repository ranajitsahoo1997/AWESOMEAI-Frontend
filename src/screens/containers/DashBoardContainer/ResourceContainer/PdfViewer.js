import React from 'react';
import PropTypes from 'prop-types';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { color } from 'framer-motion';

function PdfViewer({ fileUrl }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  console.log(fileUrl);

  return (
    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js" >
      <div style={{ height: '750px' ,width: "100%"}}>
        {fileUrl ? (
          <Viewer 
            fileUrl={fileUrl} 
            plugins={[defaultLayoutPluginInstance]} 
            initialPage={1}
            enableSmoothScroll={true}
            defaultScale={1}

          />
        ) : (
          <div>No PDF file specified</div>
        )}
      </div>
    </Worker>
  );
}

PdfViewer.propTypes = {
  fileUrl: PropTypes.string,
};

export default PdfViewer;