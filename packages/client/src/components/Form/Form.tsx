import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Input from '@/components/Input/Input'
import { validationRules } from '@/utils/validation'
import { FORM_TYPE } from '@/components/Form/constants'

interface IForm {
  inputsData: Record<string, any>
  onSubmit: SubmitHandler<any>
  inputNames: string[]
  type: string
}

const FormComponent: React.FC<IForm> = ({
  inputsData,
  onSubmit,
  inputNames,
  type,
}) => {
  const { control, handleSubmit, formState, trigger } = useForm({
    reValidateMode: 'onChange',
  })

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {inputNames.map(name => {
        const item = inputsData[name]
        return (
          <Controller
            key={item.id}
            name={item.id}
            control={control}
            rules={validationRules[item.id as keyof typeof validationRules]}
            render={({ field }) => (
              <Input
                id={item.id}
                name={item.name}
                label={item.label}
                type={item.type}
                onChange={event => field.onChange(event.target.value)}
                onBlur={() => {
                  field.onBlur()
                  trigger(item.id)
                }}
                error={formState.errors[item.id]?.message}
                required={item.required}
              />
            )}
          />
        )
      })}
      <div className="button-container">
        <button type="submit">
          {FORM_TYPE[type.toUpperCase() as keyof typeof FORM_TYPE]}
        </button>
      </div>
    </form>
  )
}

export default FormComponent
