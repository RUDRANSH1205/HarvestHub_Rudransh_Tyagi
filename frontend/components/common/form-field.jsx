import { cn } from '@/lib/utils'

const inputClasses =
  'w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-2 focus:outline-ring/30 disabled:opacity-60'

/**
 * Label + input in one component.
 * type can be: text, email, tel, password, number, date, select, textarea
 * For select, pass options as ['A', 'B'] or [{ value, label }].
 */
export function FormField({ label, name, type = 'text', options = [], error, className, placeholder, suffix, ...props }) {
  const id = `field-${name}`
  const errorId = error ? `${id}-error` : undefined

  let control
  if (type === 'select') {
    control = (
      <select id={id} name={name} className={inputClasses} aria-invalid={!!error} aria-describedby={errorId} {...props}>
        <option value="">{placeholder || `Select ${label.toLowerCase()}`}</option>
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value
          const text = typeof option === 'string' ? option : option.label
          return (
            <option key={value} value={value}>
              {text}
            </option>
          )
        })}
      </select>
    )
  } else if (type === 'textarea') {
    control = (
      <textarea
        id={id}
        name={name}
        rows={3}
        placeholder={placeholder}
        className={cn(inputClasses, 'resize-y')}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      />
    )
  } else if (suffix) {
    const suffixId = `${id}-suffix`
    const typedText = props.value || placeholder || ''
    control = (
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={cn(inputClasses, 'h-10')}
          aria-invalid={!!error}
          aria-describedby={[suffixId, errorId].filter(Boolean).join(' ')}
          {...props}
        />
        <span id={suffixId} className="sr-only">
          {`Ends with ${suffix}`}
        </span>
      </div>
    )
  } else {
    control = (
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={cn(inputClasses, 'h-10')}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      />
    )
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {props.required && <span className="text-destructive"> *</span>}
      </label>
      {control}
      {error && (
        <p id={errorId} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
