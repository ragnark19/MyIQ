'use client'

interface ShareButtonsProps {
  iqScore: number
  percentile: number
}

export default function ShareButtons({ iqScore, percentile }: ShareButtonsProps) {
  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=I scored ${iqScore} on the MyIQ test! That's the ${percentile}th percentile. Think you can beat it?`,
      '_blank'
    )
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(
      `I scored ${iqScore} on the MyIQ test! That's the ${percentile}th percentile.`
    )
    alert('Copied to clipboard!')
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleTwitterShare}
        className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
      >
        Share on Twitter
      </button>
      <button
        onClick={handleCopyToClipboard}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Copy to Clipboard
      </button>
    </div>
  )
}
