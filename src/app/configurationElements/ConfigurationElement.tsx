import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, Dropdown } from 'semantic-ui-react'
import { IRootState } from '../../store/state'
import { panelActions } from '../Panel/actions'

export type ConfigurationElement = 'arrowButton' | 'optional'

interface IConfigurationElementProps {
  name: string
  page: string
  type: ConfigurationElement
}

export const ConfigurationElement = ({
  name,
  page,
  type,
}: IConfigurationElementProps): ReactElement | null => {
  const dispatch = useDispatch()
  const { value } = useSelector(
    (state: IRootState) => state.panel.pages[page][name],
  )

  const handleChange = (evt: any, data: any): void => {
    dispatch(
      panelActions.setFieldValue({
        value: data.value || data.checked,
        name,
        page,
      }),
    )
  }

  const handleFocus = (): void => {
    dispatch(panelActions.setFocusedField({ name }))
  }

  const handleBlur = (): void => {
    dispatch(panelActions.setFocusedField({ name: undefined }))
  }

  switch (type) {
    case 'arrowButton':
      return (
        <Dropdown
          onChange={handleChange}
          selection={true}
          options={[
            { text: 'Simple arrow', value: '0', icon: 'arrow left' },
            { text: 'Circle arrow', value: '1', icon: 'arrow circle left' },
            { text: 'Angle arrow', value: '2', icon: 'angle left' },
          ]}
          name={name}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )

    case 'optional':
      return (
        <Checkbox
          onChange={handleChange}
          checked={value}
          toggle={true}
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )

    default:
      return null
  }
}
