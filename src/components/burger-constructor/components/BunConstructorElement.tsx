import { memo } from 'react'

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'

import { bunSelector } from '@services/index'

import styles from '../burgerConstructor.module.css'

type BunConstructorElementProps = {
    type: string
}

export const BunConstructorElement = memo(({ type }: BunConstructorElementProps): JSX.Element => {
    const bun = useSelector(bunSelector)

    return (
        <>
            {!!bun && (type === 'top' || type === 'bottom') ? (
                <ConstructorElement
                    thumbnail={bun.image_mobile}
                    price={bun.price}
                    text={type === 'top' ? `${bun?.name} (верх)` : `${bun?.name} (низ)`}
                    isLocked={true}
                    type={type}
                    extraClass={styles.constructorElementHover}
                />
            ) : (
                <section className={type === 'top' ? styles.emptyBunTop : styles.emptyBunBottom}>
                    <p>Добавьте булку</p>
                </section>
            )}
        </>
    )
})
