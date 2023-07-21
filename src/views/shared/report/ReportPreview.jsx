import { ArrowLeftIcon, PrinterIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import Button from '../../../components/Button';
import DummyPDF from '../../../assets/pdf/Dummy preview emonev.pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

export default function ReportPreview() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  return (
    <>
      <div className="flex justify-between">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Kembali
          </h1>
        </Link>

        <Button
          background="bg-primary"
          textColor="text-white"
          icon={<PrinterIcon className="w-4 h-4" />}
        >
          Cetak
        </Button>
      </div>
      <div className="w-full h-full mt-6 bg-white rounded-lg">
        <Document
          file={DummyPDF}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </>
  );
}
