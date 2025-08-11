import { StyleSheet, View } from 'react-native'
import { IBasicTableConfig, TRenderDataCellProps, TRenderHeaderCellProps } from '@/types/table'

const BasicDataTable = <TTableData,>({
  tableConfig,
  data,
}: {
  tableConfig: IBasicTableConfig<TTableData>
  data: TTableData[]
}) => {
  const { columns } = tableConfig

  return (
    <>
      <View style={styles.tableTitleContainer}>
        {columns.map(eachColumn => {
          const { headerProps, columnHeaderCellStyles, columnHeaderTextStyles, renderHeaderCell } =
            eachColumn

          return renderHeaderCell({ headerProps, columnHeaderCellStyles, columnHeaderTextStyles })
        })}
      </View>

      {data.map((rowData: any) => {
        return (
          <View style={styles.tableRowContainer}>
            {columns.map(eachColumn => {
              const { dataCellStyles, dataCellTextStyles, renderDataCell } = eachColumn

              return renderDataCell({ rowData, dataCellStyles, dataCellTextStyles })
            })}
          </View>
        )
      })}
    </>
  )
}

const styles = StyleSheet.create({
  tableTitleContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tableRowContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
})

export default BasicDataTable
