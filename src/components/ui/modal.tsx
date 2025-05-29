
import * as React from "react"
import { useColors } from '@/contexts/ColorContext'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog'
import { Button } from './button'

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
  saveLabel?: string;
  cancelLabel?: string;
}

export function Modal({
  isOpen,
  onOpenChange,
  title,
  children,
  onSave,
  onCancel,
  saveLabel = "Save",
  cancelLabel = "Cancel"
}: ModalProps) {
  const { colors } = useColors();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader 
          className="p-4 rounded-t-lg"
          style={{
            background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientMiddle})`
          }}
        >
          <DialogTitle className="text-white text-xl font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          {children}
          {(onSave || onCancel) && (
            <div className="flex gap-2 pt-4">
              {onSave && (
                <Button 
                  onClick={onSave} 
                  variant="gradient"
                  className="flex-1"
                >
                  {saveLabel}
                </Button>
              )}
              {onCancel && (
                <Button 
                  variant="outline" 
                  onClick={onCancel} 
                  className="flex-1"
                >
                  {cancelLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
