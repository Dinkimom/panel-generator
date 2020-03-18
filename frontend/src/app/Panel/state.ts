import { ConfigurationElement } from '../configurationElements/ConfigurationElement'
import { ISettings } from '../../shared/types/ISettings'

export interface IPanelState {
  name: string
  online: boolean
  currentPage: null | string
  pages: ISettings
  focusedField?: string
}
