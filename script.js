

    // GERAR PDF
async function gerarPDF(divId, mode = 'landscape') {
    // Obtém a div com o id especificado
    const element = document.getElementById(divId);

    // Remove os elementos indesejados
    const botaoGerarMapa = document.getElementById('generateMapPdf');
    const imagemCloseStyle = document.querySelector('.close-style');

    if (botaoGerarMapa) {
        botaoGerarMapa.style.display = 'none';
    }

    if (imagemCloseStyle) {
        imagemCloseStyle.style.display = 'none';
    }

    // Aplica estilo CSS para evitar quebras indesejadas
    const css = `
        #${divId} {
            page-break-inside: avoid;
        }
        #${divId} * {
            page-break-inside: avoid;
            page-break-after: auto;
        }
    `;
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

    // Configura opções para o html2pdf
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5], // Margens: [top, right, bottom, left] em cm
        filename: 'documento.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2
        }, // Ajuste a escala para melhor qualidade
        jsPDF: {
            unit: 'cm',
            format: 'a4',
            orientation: mode
        } // Define unidade como cm e formato como A4
    };

    // Gera o PDF
    await html2pdf().set(opt).from(element).save();

    // Remove o estilo CSS adicionado
    document.head.removeChild(style);

    // Reverte as alterações no DOM
    if (botaoGerarMapa) {
        botaoGerarMapa.style.display = '';
    }

    if (imagemCloseStyle) {
        imagemCloseStyle.style.display = '';
    }
}
