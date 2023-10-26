import React from 'react'

export const textareaHeightAutoResize = (
  event: React.ChangeEvent<HTMLTextAreaElement>
) => {
  const textarea = event.target
  textarea.style.height = 'auto'
  const maxHeight = 250

  if (textarea.scrollHeight < maxHeight) {
    textarea.style.height = textarea.scrollHeight + 'px'
  } else {
    textarea.style.height = maxHeight + 'px'
  }
}
