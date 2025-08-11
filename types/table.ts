import { TextStyle, ViewStyle } from 'react-native'

export type TBasicTableHeaderProps = {
  title: string
}

export type TRenderHeaderCellProps = {
  headerProps: TBasicTableHeaderProps
  columnHeaderCellStyles?: ViewStyle
  columnHeaderTextStyles?: TextStyle
}

export type TRenderDataCellParams<TTableData = any> = {
  rowData: TTableData
  dataCellStyles?: ViewStyle
  dataCellTextStyles?: TextStyle
}

export type TRenderDataCellProps = {
  cellValue: string | number
  dataCellStyles?: ViewStyle
  dataCellTextStyles?: TextStyle
}

export interface IBasicTableConfigColumn<TTableData> {
  headerProps: TBasicTableHeaderProps
  columnHeaderCellStyles?: ViewStyle
  columnHeaderTextStyles?: TextStyle
  dataCellStyles?: ViewStyle
  dataCellTextStyles?: TextStyle
  renderHeaderCell: ({
    headerProps,
    columnHeaderCellStyles,
    columnHeaderTextStyles,
  }: TRenderHeaderCellProps) => React.JSX.Element
  renderDataCell: ({
    rowData,
    dataCellStyles,
    dataCellTextStyles,
  }: TRenderDataCellParams<TTableData>) => React.JSX.Element
}

export interface IBasicTableConfig<TTableData> {
  columns: IBasicTableConfigColumn<TTableData>[]
}
