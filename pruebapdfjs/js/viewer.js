const url = 'https://drive.google.com/uc?export=download&id=1ur2wiu-QH56N_FsKdaiMEEcYy3sgGDlA';

const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');

pdfjsLib.getDocument(url).promise.then(pdfDoc => {
    pdfDoc.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };

        page.render(renderContext);
    }).catch(error => {
        console.error('Error rendering page:', error);
    });
}).catch(error => {
    console.error('Error loading PDF:', error);
});
