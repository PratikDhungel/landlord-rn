import BasicDataTable from '@/components/table/DataTable'
import NoDataAvailable from '@/components/common/NoDataAvailable'
import { getRentalPaymentsTableConfig } from '@/components/rentalPayments/utils/paymentsTableConfig'

import { TRentalPayment } from '@/types/rentalPayments'
import { prepareRentalPaymentsData } from '@/components/rentalPayments/utils/paymentTableDataUtils'

const RentalPaymentsTable = ({ rentalPayments }: { rentalPayments: TRentalPayment[] }) => {
  if (rentalPayments.length === 0) {
    return <NoDataAvailable />
  }

  const rentalPaymentsTableConfig = getRentalPaymentsTableConfig(() => {})
  const rentalPaymentsData = prepareRentalPaymentsData(rentalPayments)

  return <BasicDataTable tableConfig={rentalPaymentsTableConfig} data={rentalPaymentsData} />
}

export default RentalPaymentsTable
