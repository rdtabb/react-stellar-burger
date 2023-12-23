import React from 'react'

import { useController, UseControllerProps } from 'react-hook-form'

import { FormValues } from './form'

interface FieldProps extends UseControllerProps<FormValues> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as: React.FC<any>
    placeholder?: string
}

export const Field = ({ control, name, as: Component, ...rest }: FieldProps) => {
    const { field } = useController({
        control,
        name
    })

    return <Component {...field} {...rest} ref={null} />
}
