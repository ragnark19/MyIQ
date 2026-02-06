import jsPDF from 'jspdf'

interface CertificateData {
  iqScore: number
  percentile: number
  certificateNumber: string
  completedAt: string
  categoryScores?: {
    category: string
    percentage: number
  }[]
}

export function generateCertificatePDF(data: CertificateData): jsPDF {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const centerX = pageWidth / 2

  // Background gradient effect (simulated with rectangles)
  doc.setFillColor(248, 250, 252)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  // Border
  doc.setDrawColor(14, 165, 233)
  doc.setLineWidth(3)
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20)

  doc.setDrawColor(217, 70, 239)
  doc.setLineWidth(1)
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30)

  // Header decoration
  doc.setFillColor(14, 165, 233)
  doc.circle(30, 30, 5, 'F')
  doc.circle(pageWidth - 30, 30, 5, 'F')
  doc.circle(30, pageHeight - 30, 5, 'F')
  doc.circle(pageWidth - 30, pageHeight - 30, 5, 'F')

  // Title
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(36)
  doc.setTextColor(15, 23, 42)
  doc.text('Certificate of Achievement', centerX, 45, { align: 'center' })

  // Subtitle
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(16)
  doc.setTextColor(100, 116, 139)
  doc.text('IQ Assessment Results', centerX, 55, { align: 'center' })

  // Main content box
  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(40, 65, pageWidth - 80, 80, 5, 5, 'FD')

  // IQ Score
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(72)
  doc.setTextColor(14, 165, 233)
  doc.text(data.iqScore.toString(), centerX, 105, { align: 'center' })

  doc.setFontSize(18)
  doc.setTextColor(100, 116, 139)
  doc.text('IQ Score', centerX, 118, { align: 'center' })

  // Percentile
  doc.setFontSize(14)
  doc.setTextColor(15, 23, 42)
  doc.text(`${data.percentile}th Percentile`, centerX, 135, { align: 'center' })

  // Category scores (if available)
  if (data.categoryScores && data.categoryScores.length > 0) {
    const startX = 50
    const barWidth = (pageWidth - 100) / data.categoryScores.length - 10

    data.categoryScores.forEach((score, index) => {
      const x = startX + (index * (barWidth + 10))

      // Label
      doc.setFontSize(8)
      doc.setTextColor(100, 116, 139)
      doc.text(score.category.replace(' Reasoning', ''), x + barWidth/2, 152, { align: 'center' })

      // Score
      doc.setFontSize(10)
      doc.setTextColor(15, 23, 42)
      doc.text(`${score.percentage}%`, x + barWidth/2, 160, { align: 'center' })
    })
  }

  // Footer info
  doc.setFontSize(10)
  doc.setTextColor(100, 116, 139)

  // Certificate number
  doc.text(`Certificate Number: ${data.certificateNumber}`, 30, pageHeight - 35)

  // Date
  const date = new Date(data.completedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  doc.text(`Issued: ${date}`, 30, pageHeight - 28)

  // Verification note
  doc.setFontSize(8)
  doc.text('This certificate verifies completion of the MyIQ cognitive assessment.', centerX, pageHeight - 28, { align: 'center' })

  // Logo/Brand
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(14, 165, 233)
  doc.text('MyIQ', pageWidth - 30, pageHeight - 35, { align: 'right' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(100, 116, 139)
  doc.text('Professional IQ Assessment', pageWidth - 30, pageHeight - 28, { align: 'right' })

  return doc
}
