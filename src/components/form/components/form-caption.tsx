import React, { memo } from 'react'

import { Link } from 'react-router-dom'

import styles from '../form.module.css'
import { ICaption } from '../form.types'

interface IFormCaption {
    captionsConfig: ICaption[]
}

export const FormCaption = memo(({ captionsConfig }: IFormCaption) => (
    <div className={styles.captionContainer}>
        {captionsConfig.map((caption, index) => (
            <p className={styles.caption} key={index}>
                {caption.captionText}{' '}
                <Link className={styles.captionLink} to={caption.linkRoute}>
                    {caption.linkText}
                </Link>
            </p>
        ))}
    </div>
))
