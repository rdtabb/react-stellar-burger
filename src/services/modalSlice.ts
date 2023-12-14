import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

import styles from '@components/modal/modal.module.css'
import { RootState } from '@store/store'
import { ModalType, ModalClass, IInitialModalSliceState } from '@utils/index'

const initialState: IInitialModalSliceState = {
    openPopupType: 'closed',
    popupClass: styles.modal
}

const modalSlice = createSlice({
    name: 'services/modalSlice',
    initialState,
    reducers: {
        setPopupState(state, { payload }: PayloadAction<ModalType>) {
            state.openPopupType = payload
        },
        setPopupClass(state, { payload }: PayloadAction<ModalClass>) {
            state.popupClass = payload
        }
    }
})

export const openPopupTypeSelector = createSelector(
    (state: RootState) => state.modal,
    (modal) => modal.openPopupType
)

export const popupClassSelector = createSelector(
    (state: RootState) => state.modal,
    (modal) => modal.popupClass
)

export const { setPopupState, setPopupClass } = modalSlice.actions

export default modalSlice.reducer
