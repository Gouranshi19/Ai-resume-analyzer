import { Link } from 'react-router-dom'
import './UploadPanel.css'

function UploadPanel({ actionLabel, fileName, fileSize, status }) {
  return (
    <div className="upload-panel">
      <span aria-hidden="true" className="upload-panel__file-icon">↥</span>
      <div className="upload-panel__content">
        <span className="upload-panel__eyebrow">Your resume</span>
        <strong>{fileName}</strong>
        <small>{fileSize}</small>
      </div>
      <span className="upload-panel__status">{status}</span>
      <Link className="upload-panel__button" to="/upload-resume">{actionLabel} <span aria-hidden="true">→</span></Link>
    </div>
  )
}

export default UploadPanel