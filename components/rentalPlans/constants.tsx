import BasicTableHeader from '@/components/table/BasicTableHeader'
import BasicTableRowCell from '@/components/table/BasicTableCell'

import { TRentalPlan } from '@/types/rentalPlan'
import { IBasicTableConfig, TRenderDataCellParams, TRenderHeaderCellProps } from '@/types/table'

export function getRentalPlanTableConfig() {
  const tableConfig = {
    columns: [
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
        }: TRenderDataCellParams<TRentalPlan>) => (
          <BasicTableRowCell
            cellValue={rowData.name}
            dataCellStyles={dataCellStyles}
            dataCellTextStyles={dataCellTextStyles}
          />
        ),
      },
      {
        headerProps: { title: 'Rate Period' },
        columnHeaderTextStyles: {
          textAlign: 'center',
        },
        dataCellTextStyles: {
          textAlign: 'center',
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
        }: TRenderDataCellParams<TRentalPlan>) => (
          <BasicTableRowCell
            cellValue={rowData.ratePeriod}
            dataCellStyles={dataCellStyles}
            dataCellTextStyles={dataCellTextStyles}
          />
        ),
      },
      {
        headerProps: { title: 'Rate' },
        columnHeaderTextStyles: {
          textAlign: 'center',
        },
        dataCellTextStyles: {
          textAlign: 'center',
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
        }: TRenderDataCellParams<TRentalPlan>) => (
          <BasicTableRowCell
            cellValue={rowData.rate}
            dataCellStyles={dataCellStyles}
            dataCellTextStyles={dataCellTextStyles}
          />
        ),
      },
    ],
  } as IBasicTableConfig<TRentalPlan>

  return tableConfig
}
