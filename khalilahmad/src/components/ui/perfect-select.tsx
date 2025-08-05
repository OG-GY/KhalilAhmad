"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check, ChevronDown, X, Search, AlertCircle, Loader2, Plus } from "lucide-react"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  description?: string
  group?: string
  color?: string
}

interface PerfectSelectProps {
  label?: string
  error?: string
  success?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  showClearButton?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "filled" | "underlined"
  placeholder?: string
  options: SelectOption[]
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[]) => void
  onFocus?: () => void
  onBlur?: () => void
  onSearch?: (query: string) => void
  disabled?: boolean
  multiple?: boolean
  searchable?: boolean
  maxSelections?: number
  showSelectAll?: boolean
  emptyMessage?: string
  loadingMessage?: string
  isLoading?: boolean
  className?: string
  dropdownClassName?: string
  optionClassName?: string
  maxHeight?: number
  closeOnSelect?: boolean
  allowCreate?: boolean
  onCreate?: (value: string) => void
  portal?: boolean
  position?: "auto" | "top" | "bottom"
  required?: boolean
  name?: string
  id?: string
}

const PerfectSelect = React.forwardRef<HTMLDivElement, PerfectSelectProps>(
  (
    {
      className,
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      showClearButton = true,
      size = "md",
      variant = "default",
      placeholder = "Select an option...",
      options = [],
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onSearch,
      disabled = false,
      multiple = false,
      searchable = false,
      maxSelections,
      showSelectAll = false,
      emptyMessage = "No options found",
      loadingMessage = "Loading...",
      isLoading = false,
      dropdownClassName,
      optionClassName,
      maxHeight = 300,
      closeOnSelect = true,
      allowCreate = false,
      onCreate,
      portal = false,
      position = "auto",
      required = false,
      name,
      id,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(defaultValue || (multiple ? [] : ""))
    const [isOpen, setIsOpen] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
    const [dropdownPosition, setDropdownPosition] = React.useState<"top" | "bottom">("bottom")

    const containerRef = React.useRef<HTMLDivElement>(null)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const searchInputRef = React.useRef<HTMLInputElement>(null)
    const optionRefs = React.useRef<(HTMLDivElement | null)[]>([])

    React.useImperativeHandle(ref, () => containerRef.current!)

    // Controlled vs uncontrolled
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    // Handle value changes
    const handleValueChange = React.useCallback(
      (newValue: string | string[]) => {
        if (!isControlled) {
          setInternalValue(newValue)
        }
        onChange?.(newValue)
      },
      [isControlled, onChange],
    )

    // Handle click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setIsFocused(false)
          setSearchQuery("")
          setHighlightedIndex(-1)
          onBlur?.()
        }
      }

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isOpen, onBlur])

    // Handle dropdown positioning
    React.useEffect(() => {
      if (isOpen && containerRef.current && position === "auto") {
        const rect = containerRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom
        const spaceAbove = rect.top

        if (spaceBelow < maxHeight && spaceAbove > spaceBelow) {
          setDropdownPosition("top")
        } else {
          setDropdownPosition("bottom")
        }
      }
    }, [isOpen, maxHeight, position])

    // Filter options based on search query
    const filteredOptions = React.useMemo(() => {
      if (!searchQuery) return options
      return options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }, [options, searchQuery])

    // Group options
    const groupedOptions = React.useMemo(() => {
      const groups: Record<string, SelectOption[]> = {}
      const ungrouped: SelectOption[] = []

      filteredOptions.forEach((option) => {
        if (option.group) {
          if (!groups[option.group]) {
            groups[option.group] = []
          }
          groups[option.group].push(option)
        } else {
          ungrouped.push(option)
        }
      })

      return { groups, ungrouped }
    }, [filteredOptions])

    // Flatten options for keyboard navigation
    const flatOptions = React.useMemo(() => {
      return [...groupedOptions.ungrouped, ...Object.values(groupedOptions.groups).flat()]
    }, [groupedOptions])

    const selectedValues = React.useMemo(() => {
      if (multiple) {
        return Array.isArray(currentValue) ? currentValue : []
      }
      return currentValue ? [currentValue as string] : []
    }, [currentValue, multiple])

    const selectedOptions = React.useMemo(() => {
      return options.filter((option) => selectedValues.includes(option.value))
    }, [options, selectedValues])

    const hasValue = selectedValues.length > 0
    const isFloating = isFocused || hasValue || isOpen

    // Handle search
    const handleSearch = React.useCallback(
      (query: string) => {
        setSearchQuery(query)
        setHighlightedIndex(-1)
        onSearch?.(query)
      },
      [onSearch],
    )

    // Handle toggle
    const handleToggle = React.useCallback(() => {
      if (disabled) return

      const newIsOpen = !isOpen
      setIsOpen(newIsOpen)

      if (newIsOpen) {
        setIsFocused(true)
        onFocus?.()
        if (searchable) {
          setTimeout(() => searchInputRef.current?.focus(), 0)
        }
      } else {
        setIsFocused(false)
        setSearchQuery("")
        setHighlightedIndex(-1)
        onBlur?.()
      }
    }, [disabled, isOpen, onFocus, onBlur, searchable])

    // Handle option selection
    const handleOptionSelect = React.useCallback(
      (option: SelectOption) => {
        if (option.disabled) return

        let newValue: string | string[]

        if (multiple) {
          const currentValues = Array.isArray(currentValue) ? currentValue : []
          if (currentValues.includes(option.value)) {
            newValue = currentValues.filter((v) => v !== option.value)
          } else {
            if (maxSelections && currentValues.length >= maxSelections) return
            newValue = [...currentValues, option.value]
          }
        } else {
          newValue = option.value
          if (closeOnSelect) {
            setIsOpen(false)
            setIsFocused(false)
            setSearchQuery("")
          }
        }

        handleValueChange(newValue)
        setHighlightedIndex(-1)
      },
      [multiple, currentValue, maxSelections, closeOnSelect, handleValueChange],
    )

    // Handle select all
    const handleSelectAll = React.useCallback(() => {
      if (!multiple) return

      const availableOptions = filteredOptions.filter((opt) => !opt.disabled)
      const availableValues = availableOptions.map((opt) => opt.value)
      const currentValues = Array.isArray(currentValue) ? currentValue : []

      const isAllSelected = availableValues.every((val) => currentValues.includes(val))

      if (isAllSelected) {
        const newValues = currentValues.filter((val) => !availableValues.includes(val))
        handleValueChange(newValues)
      } else {
        const newValues = [...new Set([...currentValues, ...availableValues])]
        if (maxSelections) {
          handleValueChange(newValues.slice(0, maxSelections))
        } else {
          handleValueChange(newValues)
        }
      }
    }, [multiple, filteredOptions, currentValue, maxSelections, handleValueChange])

    // Handle clear
    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation()
        handleValueChange(multiple ? [] : "")
        setSearchQuery("")
        setHighlightedIndex(-1)
      },
      [multiple, handleValueChange],
    )

    // Handle create new option
    const handleCreate = React.useCallback(() => {
      if (!allowCreate || !onCreate || !searchQuery.trim()) return

      onCreate(searchQuery.trim())
      setSearchQuery("")
      setHighlightedIndex(-1)
    }, [allowCreate, onCreate, searchQuery])

    // Keyboard navigation
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return

        switch (e.key) {
          case "Enter":
            e.preventDefault()
            if (!isOpen) {
              handleToggle()
            } else if (highlightedIndex >= 0 && highlightedIndex < flatOptions.length) {
              handleOptionSelect(flatOptions[highlightedIndex])
            } else if (allowCreate && searchQuery.trim() && filteredOptions.length === 0) {
              handleCreate()
            }
            break

          case " ":
            if (!searchable || !isOpen) {
              e.preventDefault()
              if (!isOpen) {
                handleToggle()
              } else if (highlightedIndex >= 0 && highlightedIndex < flatOptions.length) {
                handleOptionSelect(flatOptions[highlightedIndex])
              }
            }
            break

          case "Escape":
            e.preventDefault()
            setIsOpen(false)
            setIsFocused(false)
            setSearchQuery("")
            setHighlightedIndex(-1)
            break

          case "ArrowDown":
            e.preventDefault()
            if (!isOpen) {
              setIsOpen(true)
              setIsFocused(true)
              onFocus?.()
            } else {
              const nextIndex = highlightedIndex < flatOptions.length - 1 ? highlightedIndex + 1 : 0
              setHighlightedIndex(nextIndex)
              optionRefs.current[nextIndex]?.scrollIntoView({ block: "nearest" })
            }
            break

          case "ArrowUp":
            e.preventDefault()
            if (isOpen) {
              const prevIndex = highlightedIndex > 0 ? highlightedIndex - 1 : flatOptions.length - 1
              setHighlightedIndex(prevIndex)
              optionRefs.current[prevIndex]?.scrollIntoView({ block: "nearest" })
            }
            break

          case "Tab":
            if (isOpen) {
              setIsOpen(false)
              setIsFocused(false)
              setSearchQuery("")
              setHighlightedIndex(-1)
            }
            break
        }
      },
      [
        disabled,
        isOpen,
        highlightedIndex,
        flatOptions,
        searchable,
        allowCreate,
        searchQuery,
        filteredOptions,
        handleToggle,
        handleOptionSelect,
        handleCreate,
        onFocus,
      ],
    )

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
      const baseClasses = "w-full transition-all duration-200 ease-in-out bg-background cursor-pointer"

      switch (variant) {
        case "filled":
          return cn(
            baseClasses,
            "bg-muted/50 border-0 rounded-lg",
            "focus-within:bg-background focus-within:ring-2 focus-within:ring-primary/20",
            isOpen && "bg-background ring-2 ring-primary/20",
            error && "focus-within:ring-destructive/20 bg-destructive/5",
            success && "focus-within:ring-green-500/20 bg-green-50",
            disabled && "bg-muted/30 cursor-not-allowed",
          )
        case "underlined":
          return cn(
            baseClasses,
            "border-0 border-b-2 border-border rounded-none bg-transparent",
            "focus-within:border-primary",
            isOpen && "border-primary",
            error && "border-destructive focus-within:border-destructive",
            success && "border-green-500 focus-within:border-green-500",
            disabled && "border-muted cursor-not-allowed",
          )
        default:
          return cn(
            baseClasses,
            "border border-border rounded-lg",
            "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
            isOpen && "border-primary ring-2 ring-primary/20",
            error && "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
            success && "border-green-500 focus-within:border-green-500 focus-within:ring-green-500/20",
            disabled && "border-muted cursor-not-allowed",
            isHovered && !disabled && "border-primary/50",
          )
      }
    }

    const renderSelectedValue = () => {
      if (selectedOptions.length === 0) {
        return <span className="text-muted-foreground">{placeholder}</span>
      }

      if (multiple) {
        if (selectedOptions.length === 1) {
          return (
            <div className="flex items-center gap-2">
              {selectedOptions[0].icon}
              <span>{selectedOptions[0].label}</span>
            </div>
          )
        }
        return (
          <div className="flex items-center gap-1 flex-wrap">
            {selectedOptions.slice(0, 2).map((option) => (
              <span
                key={option.value}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-md text-sm"
              >
                {option.icon}
                {option.label}
              </span>
            ))}
            {selectedOptions.length > 2 && (
              <span className="text-sm text-muted-foreground">+{selectedOptions.length - 2} more</span>
            )}
          </div>
        )
      }

      return (
        <div className="flex items-center gap-2">
          {selectedOptions[0].icon}
          <span>{selectedOptions[0].label}</span>
        </div>
      )
    }

    const renderOption = (option: SelectOption, index: number) => {
      const isSelected = selectedValues.includes(option.value)
      const isHighlighted = index === highlightedIndex

      return (
        <div
          key={option.value}
          ref={(el) => {
            optionRefs.current[index] = el;
          }}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors relative",
            "hover:bg-muted/50 focus:bg-muted/50",
            isHighlighted && "bg-muted/50",
            isSelected && "bg-primary/10",
            option.disabled && "opacity-50 cursor-not-allowed",
            optionClassName,
          )}
          onClick={() => !option.disabled && handleOptionSelect(option)}
          role="option"
          aria-selected={isSelected}
          aria-disabled={option.disabled}
        >
          {multiple && (
            <div
              className={cn(
                "w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0",
                isSelected ? "border-primary bg-primary" : "border-muted-foreground",
                option.disabled && "opacity-50",
              )}
            >
              {isSelected && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
            </div>
          )}

          {option.icon && (
            <div className={cn("text-muted-foreground flex-shrink-0", option.color && `text-${option.color}-500`)}>
              {option.icon}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{option.label}</div>
            {option.description && <div className="text-sm text-muted-foreground truncate">{option.description}</div>}
          </div>

          {!multiple && isSelected && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
        </div>
      )
    }

    const dropdownContent = (
      <div
        ref={dropdownRef}
        className={cn(
          "absolute left-0 right-0 z-50 mt-1 bg-background border border-border rounded-lg shadow-lg",
          "animate-in fade-in-0 zoom-in-95 duration-100",
          dropdownPosition === "top" && "bottom-full mb-1 mt-0",
          dropdownClassName,
        )}
        style={{ maxHeight }}
        role="listbox"
        aria-multiselectable={multiple}
      >
        {searchable && (
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search options..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm bg-transparent border-0 outline-none placeholder:text-muted-foreground"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        )}

        <div className="max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              {loadingMessage}
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              {allowCreate && searchQuery.trim() ? (
                <button
                  onClick={handleCreate}
                  className="flex items-center gap-2 w-full text-left hover:bg-muted/50 rounded px-2 py-1 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Create &quot;{searchQuery.trim()}&quot;
                </button>
              ) : (
                emptyMessage
              )}
            </div>
          ) : (
            <>
              {multiple && showSelectAll && filteredOptions.length > 1 && (
                <div
                  className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-muted/50 border-b border-border"
                  onClick={handleSelectAll}
                >
                  <div className="w-4 h-4 border-2 rounded flex items-center justify-center border-primary bg-primary">
                    <Check className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                  <span className="font-medium">Select All</span>
                </div>
              )}

              {groupedOptions.ungrouped.map((option, index) => renderOption(option, index))}

              {Object.entries(groupedOptions.groups).map(([groupName, groupOptions]) => (
                <div key={groupName}>
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted/30 sticky top-0">
                    {groupName}
                  </div>
                  {groupOptions.map((option, index) => renderOption(option, groupedOptions.ungrouped.length + index))}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    )

    return (
      <div className="w-full space-y-2">
        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {/* Select Field */}
          <div
            ref={containerRef}
            className={cn(
              sizeClasses[size],
              getVariantClasses(),
              "flex items-center px-3 py-2 outline-none",
              leftIcon && "pl-10",
              (rightIcon || showClearButton) && "pr-10",
              disabled && "opacity-50",
              className,
            )}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={helperText ? `${id}-helper` : undefined}
            id={id}
            {...props}
          >
            {leftIcon && (
              <div
                className={cn(
                  "absolute left-3 text-muted-foreground transition-colors",
                  isFocused && "text-primary",
                  error && "text-destructive",
                  success && "text-green-500",
                )}
              >
                {leftIcon}
              </div>
            )}

            <div className="flex-1 min-w-0">{renderSelectedValue()}</div>

            <div className="flex items-center gap-1">
              {success && !error && <Check className="h-4 w-4 text-green-500" />}
              {error && <AlertCircle className="h-4 w-4 text-destructive" />}

              {showClearButton && hasValue && !disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-0.5 rounded-full hover:bg-muted transition-colors"
                  tabIndex={-1}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              )}

              {!rightIcon && !success && !error && (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              )}

              {rightIcon && !success && !error && !showClearButton && (
                <div className={cn("text-muted-foreground transition-colors", isFocused && "text-primary")}>
                  {rightIcon}
                </div>
              )}
            </div>
          </div>

          {/* Floating Label */}
          {label && (
            <label
              htmlFor={id}
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
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}

          {/* Dropdown */}
          {isOpen && (portal ? null : dropdownContent)}

          {/* Hidden input for form submission */}
          {name && (
            <input
              type="hidden"
              name={name}
              value={Array.isArray(currentValue) ? currentValue.join(",") : currentValue || ""}
            />
          )}
        </div>

        {/* Helper Text, Error, Success Messages */}
        <div className="flex justify-between items-start gap-2 min-h-[1.25rem]">
          <div className="flex-1">
            {error && (
              <p className="text-sm text-destructive flex items-center gap-1" id={`${id}-helper`}>
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
            {success && !error && (
              <p className="text-sm text-green-600 flex items-center gap-1" id={`${id}-helper`}>
                <Check className="h-3 w-3" />
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p className="text-sm text-muted-foreground" id={`${id}-helper`}>
                {helperText}
              </p>
            )}
          </div>

          {multiple && maxSelections && (
            <p className="text-xs text-muted-foreground tabular-nums">
              {selectedValues.length}/{maxSelections}
            </p>
          )}
        </div>

        {/* Portal dropdown */}
        {isOpen && portal && (
          <div className="fixed inset-0 z-50" style={{ pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                top: containerRef.current?.getBoundingClientRect().bottom,
                left: containerRef.current?.getBoundingClientRect().left,
                width: containerRef.current?.getBoundingClientRect().width,
                pointerEvents: "auto",
              }}
            >
              {dropdownContent}
            </div>
          </div>
        )}
      </div>
    )
  },
)

PerfectSelect.displayName = "PerfectSelect"

export { PerfectSelect }
