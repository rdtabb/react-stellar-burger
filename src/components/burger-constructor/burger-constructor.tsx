import { memo } from 'react'

import { useSelector } from 'react-redux'

import { ingredientsSelector, openPopupTypeSelector } from '@services/index'

import styles from './burgerConstructor.module.css'
import { Ingredients } from './components/Ingredients'
import { PriceOrder } from './components/PriceOrder'
import { useConstructorDnd } from './hooks/hooks'

import { Modal } from '../modal/modal'
import orderDetailsStyles from '../order-details/modal.module.css'
import { OrderDetails } from '../order-details/order-details'

export const BurgerConstructor = memo(() => {
    const constructorIngredients = useSelector(ingredientsSelector)
    const openPopupType = useSelector(openPopupTypeSelector)

    const { ingridientDropRef, sortRef, boxShadow } = useConstructorDnd()

    return (
        <section ref={ingridientDropRef}>
            <div style={{ boxShadow }} className={styles.elementsGrid} ref={sortRef}>
                <Ingredients ingredients={constructorIngredients} />
            </div>
            <PriceOrder />
            {openPopupType === 'order' && (
                <Modal modalContentClass={orderDetailsStyles.modalContent}>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    )
})
