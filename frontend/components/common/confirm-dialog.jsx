'use client'

import { useState } from 'react'
import { Button } from './button'
import { Modal } from './modal'

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Delete',
  variant = 'danger',
}) {
  const [isWorking, setIsWorking] = useState(false)

  async function handleConfirm() {
    setIsWorking(true)
    try {
      await onConfirm()
      onClose()
    } finally {
      setIsWorking(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{message}</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isWorking}>
            Cancel
          </Button>
          <Button variant={variant} onClick={handleConfirm} disabled={isWorking}>
            {isWorking ? 'Please wait…' : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
