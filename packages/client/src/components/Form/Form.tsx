import Button from '@/components/Button/Button'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Input from '@/components/Input/Input'
import { validationRules } from '@/utils/validation'
import { FORM_TYPE } from '@/components/Form/constants'
import s from './Form.module.scss'

interface IForm {
  inputTypes: Record<string, any>
  onSubmit: SubmitHandler<any>
  inputNames: string[]
  type: string
  data?: any
  disabled?: boolean
  isLabel?: boolean
}

const FormComponent: React.FC<IForm> = ({
  inputTypes,
  onSubmit,
  inputNames,
  type,
  data,
  disabled,
  isLabel,
}) => {
  const { control, handleSubmit, formState, trigger, setValue } = useForm({
    reValidateMode: 'onChange',
    defaultValues: data || {},
  })

  const isFormEdited = formState.isDirty

  const handleInputChange = (name: string, value: string) => {
    setValue(name, value)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.inputs}>
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
                  label={isLabel && item.label}
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
                  placeholder={item.label}
                  disabled={disabled}
                />
              )}
            />
          )
        })}
      </div>

      {!disabled && (
        <Button
          type="submit"
          className={s.btn}
          disabled={type === 'edit_profile' ? !isFormEdited : false}>
          {FORM_TYPE[type.toUpperCase() as keyof typeof FORM_TYPE]}
        </Button>
      )}
    </form>
  )
}

export default FormComponent
