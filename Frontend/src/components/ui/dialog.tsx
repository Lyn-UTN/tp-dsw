'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type DialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-50 w-full max-w-lg mx-4">{children}</div>
    </div>
  );
}

export type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
};

export function DialogContent({
  children,
  className = '',
  onClose,
}: DialogContentProps) {
  return (
    <div
      className={`bg-background rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto ${className}`}
    >
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      {children}
    </div>
  );
}

export type DialogHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogHeader({ children, className = '' }: DialogHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogTitle({ children, className = '' }: DialogTitleProps) {
  return (
    <h2 className={`text-2xl font-semibold text-balance ${className}`}>
      {children}
    </h2>
  );
}

export type DialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogDescription({
  children,
  className = '',
}: DialogDescriptionProps) {
  return (
    <p className={`text-muted-foreground text-pretty ${className}`}>
      {children}
    </p>
  );
}

export type DialogFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogFooter({ children, className = '' }: DialogFooterProps) {
  return (
    <div className={`flex justify-end gap-2 mt-6 ${className}`}>{children}</div>
  );
}
