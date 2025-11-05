import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFOptions {
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
  quality?: number;
  margin?: number;
}

export class PDFExporter {
  static async exportToPDF(
    element: HTMLElement,
    filename: string = 'cv.pdf',
    options: PDFOptions = {}
  ): Promise<void> {
    const {
      format = 'a4',
      orientation = 'portrait',
      quality = 1,
      margin = 10
    } = options;

    try {
      // Afficher un indicateur de chargement
      const loadingElement = this.createLoadingIndicator();
      document.body.appendChild(loadingElement);

      // Capturer le contenu avec html2canvas
      const canvas = await html2canvas(element, {
        scale: quality,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          // Améliorer le rendu pour l'export
          const clonedElement = clonedDoc.querySelector('[data-export]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.width = '210mm';
            clonedElement.style.height = 'auto';
          }
        }
      });

      // Créer le PDF
      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgData = canvas.toDataURL('image/png', 1.0);
      const imgProps = pdf.getImageProperties(imgData);
      
      const marginMM = margin;
      const contentWidth = pdfWidth - (2 * marginMM);
      const contentHeight = (imgProps.height * contentWidth) / imgProps.width;

      // Ajouter la première page
      pdf.addImage(
        imgData,
        'PNG',
        marginMM,
        marginMM,
        contentWidth,
        contentHeight
      );

      // Gérer les pages multiples si nécessaire
      let heightLeft = contentHeight;
      let position = marginMM;

      if (heightLeft >= pdfHeight) {
        while (heightLeft >= 0) {
          position = heightLeft - pdfHeight + marginMM;
          pdf.addPage();
          pdf.addImage(
            imgData,
            'PNG',
            marginMM,
            -position,
            contentWidth,
            contentHeight
          );
          heightLeft -= pdfHeight;
        }
      }

      // Sauvegarder le PDF
      pdf.save(filename);

      // Nettoyer l'indicateur de chargement
      document.body.removeChild(loadingElement);

    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      throw new Error('Échec de l\'export PDF');
    }
  }

  private static createLoadingIndicator(): HTMLElement {
    const loadingDiv = document.createElement('div');
    loadingDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      color: white;
      font-size: 18px;
    `;
    loadingDiv.innerHTML = `
      <div style="background: white; padding: 20px; border-radius: 8px; color: black;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span>Génération du PDF en cours...</span>
        </div>
      </div>
    `;
    return loadingDiv;
  }
}