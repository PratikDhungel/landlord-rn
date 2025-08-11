import BasicTableHeader from '@/components/table/BasicTableHeader'
import BasicTableRowCell from '@/components/table/BasicTableCell'

import { TTransformedRentalData } from '@/types/rentals'
import { IBasicTableConfig, TRenderDataCellParams, TRenderHeaderCellProps } from '@/types/table'

type TTableRowPressCallback = (rentalId: string) => void

export function getOwnedRentalsTableConfig(tableRowPressCallback: TTableRowPressCallback) {
  const tableConfig = {
    columns: [
      {
        headerProps: { title: 'Tenant Name' },
        renderHeaderCell: ({
          headerProps,
          columnHeaderCellStyles,
          columnHeaderTextStyles,
        }: TRenderHeaderCellProps) => (
          <BasicTableHeader
            headerProps={headerProps}
            columnHeaderCellStyles={columnHeaderCellStyles}
            columnHeaderTextStyles={columnHeaderTextStyles}
          />
        ),
        renderDataCell: ({
          rowData,
          dataCellStyles,
          dataCellTextStyles,
        }: TRenderDataCellParams<TTransformedRentalData>) => (
          <BasicTableRowCell
            cellValue={rowData.tenantFullName}
            dataCellStyles={dataCellStyles}
            dataCellTextStyles={dataCellTextStyles}
          />
        ),
      },
      {
        headerProps: { title: 'Plan Name' },
        renderHeaderCell: ({
          headerProps,
          columnHeaderCellStyles,
          columnHeaderTextStyles,
        }: TRenderHeaderCellProps) => (
          <BasicTableHeader
            headerProps={headerProps}
            columnHeaderCellStyles={columnHeaderCellStyles}
            columnHeaderTextStyles={columnHeaderTextStyles}
          />
        ),
        renderDataCell: ({
          rowData,
          dataCellStyles,
          dataCellTextStyles,
        }: TRenderDataCellParams<TTransformedRentalData>) => (
          <BasicTableRowCell
            cellValue={rowData.planName}
            dataCellStyles={dataCellStyles}
            dataCellTextStyles={dataCellTextStyles}
          />
        ),
      },
      {
        headerProps: { title: 'Start Date' },
        columnHeaderTextStyles: {
          textAlign: 'right',
        },
        dataCellTextStyles: {
          textAlign: 'right',
        },
        renderHeaderCell: ({
          headerProps,
          columnHeaderCellStyles,
          columnHeaderTextStyles,
        }: TRenderHeaderCellProps) => (
          <BasicTableHeader
            headerProps={headerProps}
            columnHeaderCellStyles={columnHeaderCellStyles}
            columnHeaderTextStyles={columnHeaderTextStyles}
          />
        ),
        renderDataCell: ({
          rowData,
          dataCellStyles,
          dataCellTextStyles,
        }: TRenderDataCellParams<TTransformedRentalData>) => (
          <BasicTableRowCell
            cellValue={rowData.startDate}
            dataCellStyles={dataCellStyles}
            dataCellTextStyles={dataCellTextStyles}
          />
        ),
      },
    ],
    onTableRowPress(rowData) {
      tableRowPressCallback(rowData.id)
    },
  } as IBasicTableConfig<TTransformedRentalData>

  return tableConfig
}
