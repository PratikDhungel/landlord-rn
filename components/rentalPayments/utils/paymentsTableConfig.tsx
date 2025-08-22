import StatusPill from '@/components/pills/StatusPill'
import BasicTableHeader from '@/components/table/BasicTableHeader'
import BasicTableRowCell, { CustomTableRowCell } from '@/components/table/BasicTableCell'

import { TTransformedRentalPayment } from '@/types/rentalPayments'
import { IBasicTableConfig, TRenderDataCellParams, TRenderHeaderCellProps } from '@/types/table'

type TTableRowPressCallback = (paymentId: string) => void

export function getRentalPaymentsTableConfig(tableRowPressCallback: TTableRowPressCallback) {
  const tableConfig = {
    columns: [
      {
        headerProps: { title: 'Amount' },
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
        }: TRenderDataCellParams<TTransformedRentalPayment>) => (
          <BasicTableRowCell
            cellValue={rowData.amount}
            dataCellStyles={dataCellStyles}
            dataCellTextStyles={dataCellTextStyles}
          />
        ),
      },
      {
        headerProps: { title: 'Date' },
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
        }: TRenderDataCellParams<TTransformedRentalPayment>) => (
          <BasicTableRowCell
            cellValue={rowData.paymentDate}
            dataCellStyles={dataCellStyles}
            dataCellTextStyles={dataCellTextStyles}
          />
        ),
      },
      {
        headerProps: { title: 'Status' },
        columnHeaderCellStyles: {
          flex: 0,
          flexBasis: 80,
        },
        dataCellStyles: {
          flex: 0,
          flexBasis: 80,
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
        }: TRenderDataCellParams<TTransformedRentalPayment>) => (
          <CustomTableRowCell dataCellStyles={dataCellStyles}>
            <StatusPill statusLabel={rowData.statusLabel} pillType={rowData.pillType} />
          </CustomTableRowCell>
        ),
      },
    ],
    onTableRowPress(rowData) {
      tableRowPressCallback(rowData.id)
    },
  } as IBasicTableConfig<TTransformedRentalPayment>

  return tableConfig
}
