import { PropsWithChildren } from 'react'

import css from '../feed.module.css'

export const FeedContainer = ({ children }: PropsWithChildren) => (
    <section className={css.container}>
        <h2 className={css.title}>Лента заказов</h2>
        <div className={css['content-wrapper']}>{children}</div>
    </section>
)
