import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Input from '@/components/Input/Input'
import { validationRules } from '@/utils/validation'
import { FORM_TYPE } from '@/components/Form/constants'

interface IForm {
  inputTypes: Record<string, any>
  onSubmit: SubmitHandler<any>
  inputNames: string[]
  type: string
  data?: any
  disabled?: boolean
}

const FormComponent: React.FC<IForm> = ({
  inputTypes,
  onSubmit,
  inputNames,
  type,
  data,
  disabled,
}) => {
  const { control, handleSubmit, formState, trigger, setValue } = useForm({
    reValidateMode: 'onChange',
    defaultValues: data || {},
  })

  const handleInputChange = (name: string, value: string) => {
    setValue(name, value)
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {inputNames.map(name => {
        const item = inputTypes[name]
        return (
          <Controller
            key={item?.id}
            name={item?.id}
            control={control}
            rules={validationRules[item?.id as keyof typeof validationRules]}
            render={({ field }) => (
              <Input
                id={item.id}
                name={item.name}
                label={item.label}
                type={item.type}
                value={field.value}
                onChange={event => {
                  field.onChange(event.target.value)
                  handleInputChange(item.name, event.target.value)
                }}
                onBlur={() => {
                  field.onBlur()
                  trigger(item.id)
                }}
                error={formState.errors[item.id]?.message}
                required={item.required}
                disabled={disabled}
              />
            )}
          />
        )
      })}
      <div className="button-container">
        {!disabled && (
          <button type="submit">
            {FORM_TYPE[type.toUpperCase() as keyof typeof FORM_TYPE]}
          </button>
        )}
      </div>
    </form>
  )
}

export default FormComponent
