"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, X, Check, AlertCircle } from "lucide-react"

interface EnhancedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  error?: string
  success?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  showClearButton?: boolean
  showPasswordToggle?: boolean
  maxLength?: number
  showCharacterCount?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "filled" | "underlined"
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      showClearButton = false,
      showPasswordToggle = false,
      maxLength,
      showCharacterCount = false,
      size = "md",
      variant = "default",
      value,
      onChange,
      onFocus,
      onBlur,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = React.useState(value || "")
    const [isFocused, setIsFocused] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)

    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    React.useEffect(() => {
      if (value !== undefined) {
        setInputValue(value)
      }
    }, [value])

    const hasValue = inputValue && inputValue.toString().length > 0
    const isFloating = isFocused || hasValue
    const actualType = type === "password" && showPassword ? "text" : type

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      if (maxLength && newValue.length > maxLength) return

      setInputValue(newValue)
      onChange?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    const handleClear = () => {
      const event = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>
      setInputValue("")
      onChange?.(event)
      inputRef.current?.focus()
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    const sizeClasses = {
      sm: "h-9 text-sm",
      md: "h-11 text-base",
      lg: "h-13 text-lg",
    }

    const labelSizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    }

    const getVariantClasses = () => {
      const baseClasses = "w-full transition-all duration-200 ease-in-out bg-background"

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
          {/* Input Field */}
          <div className="relative">
            {leftIcon && (
              <div
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors",
                  isFocused && "text-primary",
                  error && "text-destructive",
                  success && "text-green-500",
                )}
              >
                {leftIcon}
              </div>
            )}

            <input
              ref={inputRef}
              type={actualType}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              className={cn(
                sizeClasses[size],
                getVariantClasses(),
                "px-3 py-2 outline-none placeholder:text-transparent",
                leftIcon && "pl-10",
                (rightIcon || showClearButton || (type === "password" && showPasswordToggle)) && "pr-10",
                disabled && "cursor-not-allowed opacity-50",
                className,
              )}
              {...props}
            />

            {/* Floating Label */}
            {label && (
              <label
                className={cn(
                  "absolute left-3 transition-all duration-200 ease-in-out pointer-events-none",
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
                    : "top-1/2 -translate-y-1/2 text-muted-foreground",
                  disabled && "text-muted-foreground/50",
                )}
              >
                {label}
              </label>
            )}

            {/* Right Icons */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {success && !error && <Check className="h-4 w-4 text-green-500" />}

              {error && <AlertCircle className="h-4 w-4 text-destructive" />}

              {showClearButton && hasValue && !disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-0.5 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              )}

              {type === "password" && showPasswordToggle && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="p-0.5 rounded-full hover:bg-muted transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  )}
                </button>
              )}

              {rightIcon && !success && !error && !showClearButton && !(type === "password" && showPasswordToggle) && (
                <div className={cn("text-muted-foreground transition-colors", isFocused && "text-primary")}>
                  {rightIcon}
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar for Character Count */}
          {maxLength && showCharacterCount && (
            <div className="mt-1">
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-300 ease-out",
                    inputValue.toString().length / maxLength < 0.8
                      ? "bg-primary"
                      : inputValue.toString().length / maxLength < 0.95
                        ? "bg-yellow-500"
                        : "bg-destructive",
                  )}
                  style={{
                    width: `${Math.min((inputValue.toString().length / maxLength) * 100, 100)}%`,
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
                inputValue.toString().length > maxLength * 0.8
                  ? inputValue.toString().length >= maxLength
                    ? "text-destructive font-medium"
                    : "text-yellow-600"
                  : "text-muted-foreground",
              )}
            >
              {inputValue.toString().length}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  },
)

EnhancedInput.displayName = "EnhancedInput"

export { EnhancedInput }
