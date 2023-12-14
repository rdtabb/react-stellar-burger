import { BurgerConstructor } from '@components/burger-constructor/burger-constructor'
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients'

import styles from './constructor.module.css'

export const Constructor = () => (
    <div className={styles.app}>
        <main className={styles.container}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    </div>
)
