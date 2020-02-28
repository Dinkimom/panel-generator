import React, { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import { usePageContext } from '../../shared/hooks/usePageContext'
import { IRootState } from '../../store/state'
import { panelActions } from '../panel/actions'

interface IConnectedElementProps {
  name: string
  children: ReactNode
  type: string
}

export const ConnectedElement = ({
  name,
  type,
  children,
}: IConnectedElementProps): ReactElement => {
  const page = usePageContext()
  const focusedField = useSelector(
    (state: IRootState) => state.panel.focusedField,
  )
  const dispatch = useDispatch()
  const initComponent = useCallback(() => {
    dispatch(panelActions.initComponent({ page, name, type }))
  }, [dispatch, name, page, type])

  useEffect(() => {
    initComponent()
  }, [initComponent])

  if (focusedField && focusedField === name) {
    // prikrutit' popap
    return <span style={{ outline: '5px solid yellow' }}>{children}</span>
  }

  return <Popup content={name} trigger={children} />
}
