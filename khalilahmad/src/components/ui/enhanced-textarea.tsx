"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, Check, AlertCircle, Maximize2, Minimize2 } from "lucide-react"

interface EnhancedTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string
  error?: string
  success?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  showClearButton?: boolean
  maxLength?: number
  showCharacterCount?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "filled" | "underlined"
  autoResize?: boolean
  minRows?: number
  maxRows?: number
  showExpandButton?: boolean
}

const EnhancedTextarea = React.forwardRef<HTMLTextAreaElement, EnhancedTextareaProps>(
  (
    {
      className,
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      showClearButton = false,
      maxLength,
      showCharacterCount = false,
      size = "md",
      variant = "default",
      value,
      onChange,
      onFocus,
      onBlur,
      disabled,
      autoResize = true,
      minRows = 3,
      maxRows = 10,
      showExpandButton = false,
      rows,
      ...props
    },
    ref,
  ) => {
    const [textareaValue, setTextareaValue] = React.useState(value || "")
    const [isFocused, setIsFocused] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [isExpanded, setIsExpanded] = React.useState(false)

    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useImperativeHandle(ref, () => textareaRef.current!)

    React.useEffect(() => {
      if (value !== undefined) {
        setTextareaValue(value)
      }
    }, [value])

    // Auto-resize functionality
    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current
        textarea.style.height = "auto"

        const scrollHeight = textarea.scrollHeight
        const lineHeight = Number.parseInt(getComputedStyle(textarea).lineHeight)
        const minHeight = lineHeight * minRows
        const maxHeight = lineHeight * (isExpanded ? 20 : maxRows)

        const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight)
        textarea.style.height = `${newHeight}px`
      }
    }, [textareaValue, autoResize, minRows, maxRows, isExpanded])

    const hasValue = textareaValue && textareaValue.toString().length > 0
    const isFloating = isFocused || hasValue

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (maxLength && newValue.length > maxLength) return

      setTextareaValue(newValue)
      onChange?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    const handleClear = () => {
      const event = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLTextAreaElement>
      setTextareaValue("")
      onChange?.(event)
      textareaRef.current?.focus()
    }

    const toggleExpand = () => {
      setIsExpanded(!isExpanded)
    }

    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    }

    const labelSizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    }

    const paddingClasses = {
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
    }

    const getVariantClasses = () => {
      const baseClasses = "w-full transition-all duration-200 ease-in-out bg-background resize-none"

      switch (variant) {
        case "filled":
          return cn(
            baseClasses,
            "bg-muted/50 border-0 rounded-lg",
            "focus:bg-background focus:ring-2 focus:ring-primary/20",
            error && "focus:ring-destructive/20 bg-destructive/5",
            success && "focus:ring-green-500/20 bg-green-50",
            disabled && "bg-muted/30",
          )
        case "underlined":
          return cn(
            baseClasses,
            "border-0 border-b-2 border-border rounded-none bg-transparent",
            "focus:border-primary",
            error && "border-destructive focus:border-destructive",
            success && "border-green-500 focus:border-green-500",
            disabled && "border-muted",
          )
        default:
          return cn(
            baseClasses,
            "border border-border rounded-lg",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            success && "border-green-500 focus:border-green-500 focus:ring-green-500/20",
            disabled && "border-muted",
            isHovered && !disabled && "border-primary/50",
          )
      }
    }

    return (
      <div className="w-full space-y-2">
        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {/* Textarea Field */}
          <div className="relative">
            {leftIcon && (
              <div
                className={cn(
                  "absolute left-3 top-3 text-muted-foreground transition-colors z-10",
                  isFocused && "text-primary",
                  error && "text-destructive",
                  success && "text-green-500",
                )}
              >
                {leftIcon}
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={textareaValue}
              onChange={handleTextareaChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              rows={autoResize ? undefined : rows || minRows}
              className={cn(
                sizeClasses[size],
                paddingClasses[size],
                getVariantClasses(),
                "outline-none placeholder:text-transparent leading-relaxed",
                leftIcon && "pl-10",
                (rightIcon || showClearButton || showExpandButton) && "pr-12",
                disabled && "cursor-not-allowed opacity-50",
                className,
              )}
              {...props}
            />

            {/* Floating Label */}
            {label && (
              <label
                className={cn(
                  "absolute left-3 transition-all duration-200 ease-in-out pointer-events-none z-10",
                  labelSizeClasses[size],
                  leftIcon && "left-10",
                  isFloating
                    ? cn(
                        "top-0 -translate-y-1/2 bg-background px-1 font-medium",
                        variant === "underlined" && "bg-transparent",
                        variant === "filled" && "bg-background",
                        isFocused && "text-primary",
                        error && "text-destructive",
                        success && "text-green-500",
                      )
                    : "top-3 text-muted-foreground",
                  disabled && "text-muted-foreground/50",
                )}
              >
                {label}
              </label>
            )}

            {/* Right Icons */}
            <div className="absolute right-3 top-3 flex flex-col items-center gap-2">
              {success && !error && <Check className="h-4 w-4 text-green-500" />}

              {error && <AlertCircle className="h-4 w-4 text-destructive" />}

              <div className="flex items-center gap-1">
                {showExpandButton && autoResize && (
                  <button
                    type="button"
                    onClick={toggleExpand}
                    className="p-0.5 rounded-full hover:bg-muted transition-colors"
                    title={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? (
                      <Minimize2 className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    ) : (
                      <Maximize2 className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    )}
                  </button>
                )}

                {showClearButton && hasValue && !disabled && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-0.5 rounded-full hover:bg-muted transition-colors"
                    title="Clear"
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                )}

                {rightIcon && !success && !error && !showClearButton && !showExpandButton && (
                  <div className={cn("text-muted-foreground transition-colors", isFocused && "text-primary")}>
                    {rightIcon}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar for Character Count */}
          {maxLength && showCharacterCount && (
            <div className="mt-1">
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-300 ease-out",
                    textareaValue.toString().length / maxLength < 0.8
                      ? "bg-primary"
                      : textareaValue.toString().length / maxLength < 0.95
                        ? "bg-yellow-500"
                        : "bg-destructive",
                  )}
                  style={{
                    width: `${Math.min((textareaValue.toString().length / maxLength) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Helper Text, Error, Success Messages, and Character Count */}
        <div className="flex justify-between items-start gap-2 min-h-[1.25rem]">
          <div className="flex-1">
            {error && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
            {success && !error && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <Check className="h-3 w-3" />
                {success}
              </p>
            )}
            {helperText && !error && !success && <p className="text-sm text-muted-foreground">{helperText}</p>}
          </div>

          {maxLength && showCharacterCount && (
            <p
              className={cn(
                "text-xs tabular-nums",
                textareaValue.toString().length > maxLength * 0.8
                  ? textareaValue.toString().length >= maxLength
                    ? "text-destructive font-medium"
                    : "text-yellow-600"
                  : "text-muted-foreground",
              )}
            >
              {textareaValue.toString().length}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  },
)

EnhancedTextarea.displayName = "EnhancedTextarea"

export { EnhancedTextarea }
