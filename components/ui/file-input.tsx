// components/ui/file-input.tsx
import React, { ChangeEvent } from "react"

interface FileInputProps {
  onChange: (file: File) => void
}

export const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onChange(file)
    }
  }

  return (
    <input
      type="file"
      onChange={handleFileChange}
    />
  )
}