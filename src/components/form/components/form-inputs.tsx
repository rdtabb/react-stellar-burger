import React from 'react'

import styles from '../form.module.css'
import { IFormInputsProps } from '../form.types'

export const FormInputs = ({ inputsConfig }: IFormInputsProps): JSX.Element[] =>
    inputsConfig.map(({ as: Component, value, valueSetter, placeholder }, index) => (
        <Component
            value={value}
            extraClass={styles.input}
            onChange={(e) => valueSetter(e.target.value)}
            placeholder={placeholder}
            key={index}
        />
    ))
