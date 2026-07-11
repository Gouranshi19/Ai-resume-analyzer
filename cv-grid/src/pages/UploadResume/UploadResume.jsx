import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import { uploadData } from '../../data/systemData'
import '../SystemPages.css'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_EXTENSIONS = ['pdf', 'docx']

function UploadResume() {
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const preventBrowserDrop = (event) => event.preventDefault()
    window.addEventListener('dragover', preventBrowserDrop)
    window.addEventListener('drop', preventBrowserDrop)

    return () => {
      window.removeEventListener('dragover', preventBrowserDrop)
      window.removeEventListener('drop', preventBrowserDrop)
    }
  }, [])

  function validateFile(file) {
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!ACCEPTED_EXTENSIONS.includes(extension)) return 'Upload a PDF or DOCX file only.'
    if (file.size > MAX_FILE_SIZE) return 'The selected file must be 10 MB or smaller.'
    return ''
  }

  function selectFile(file) {
    if (!file) return
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setSelectedFile(null)
      return
    }
    setError('')
    setSelectedFile(file)
  }

  function handleInputChange(event) {
    selectFile(event.target.files?.[0])
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragging(false)
    selectFile(event.dataTransfer.files?.[0])
  }

  function handleAnalyze() {
    if (selectedFile) navigate('/analysis-report')
  }

  return (
    <section className="system-content">
      <div className="upload-layout">
        <div className="upload-copy"><p className="system-kicker">{uploadData.eyebrow}</p><h1>{uploadData.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1><p>{uploadData.description}</p></div>
        <div className="upload-workspace">
          <input accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="upload-file-input" onChange={handleInputChange} ref={fileInputRef} type="file" />
          <div aria-describedby={error ? 'upload-error' : undefined} aria-label="Select a PDF or DOCX resume" className={`drop-zone${isDragging ? ' drop-zone--active' : ''}${selectedFile ? ' drop-zone--selected' : ''}`} onClick={() => fileInputRef.current?.click()} onDragEnter={(event) => { event.preventDefault(); setIsDragging(true) }} onDragLeave={(event) => { event.preventDefault(); setIsDragging(false) }} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); fileInputRef.current?.click() } }} role="button" tabIndex="0"><span aria-hidden="true">♧</span><h2>{selectedFile ? selectedFile.name : 'DROP CV HERE OR SELECT FILE'}</h2><p>{selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · READY FOR ANALYSIS` : 'Maximum 10MB · PDF / DOCX · One file per analysis'}</p></div>
          {error && <p className="upload-error" id="upload-error" role="alert">{error}</p>}
          <div className="upload-options">{uploadData.options.map((option) => <article key={option.label}><span>{option.label}</span><b>{option.value}</b></article>)}</div>
          <Button disabled={!selectedFile} onClick={handleAnalyze}>Start analysis <span aria-hidden="true">→</span></Button>
        </div>
      </div>
    </section>
  )
}

export default UploadResume