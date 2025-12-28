import React from 'react'
import { StyleSheet, Pressable, View } from 'react-native'

import { IBasicTableConfig } from '@/types/table'

const BasicDataTable = <TTableData,>({
  tableConfig,
  data,
}: {
  tableConfig: IBasicTableConfig<TTableData>
  data: TTableData[]
}) => {
  const { columns, onTableRowPress } = tableConfig

  function handleTableRowPress(rowData: TTableData) {
    if (onTableRowPress) {
      onTableRowPress(rowData)
    }
  }

  return (
    <>
      <View style={styles.tableTitleContainer}>
        {columns.map((eachColumn, idx) => {
          const { headerProps, columnHeaderCellStyles, columnHeaderTextStyles, renderHeaderCell } =
            eachColumn

          return (
            <React.Fragment key={idx}>
              {renderHeaderCell({
                headerProps,
                columnHeaderCellStyles,
                columnHeaderTextStyles,
              })}
            </React.Fragment>
          )
        })}
      </View>

      {data.map((rowData: TTableData, idx) => {
        return (
          <Pressable
            style={styles.tableRowContainer}
            onPress={() => handleTableRowPress(rowData)}
            key={idx}
          >
            {columns.map((eachColumn, idx) => {
              const { dataCellStyles, dataCellTextStyles, renderDataCell } = eachColumn

              return (
                <React.Fragment key={idx}>
                  {renderDataCell({
                    rowData,
                    dataCellStyles,
                    dataCellTextStyles,
                  })}
                </React.Fragment>
              )
            })}
          </Pressable>
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
