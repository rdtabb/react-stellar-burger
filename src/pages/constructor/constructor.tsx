import { BurgerConstructor, BurgerIngredients } from '@components/index'

import styles from './constructor.module.css'

export const Constructor = () => (
    <div className={styles.app}>
        <main className={styles.container}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    </div>
)
