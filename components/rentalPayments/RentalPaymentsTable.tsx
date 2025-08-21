import { useState } from 'react'
import BasicDataTable from '@/components/table/DataTable'
import NoDataAvailable from '@/components/common/NoDataAvailable'
import PaymentDetailsModal from '@/components/rentalPayments/PaymentDetailsModal'
import { getRentalPaymentsTableConfig } from '@/components/rentalPayments/utils/paymentsTableConfig'

import { prepareRentalPaymentsData } from '@/components/rentalPayments/utils/paymentTableDataUtils'

import { TRentalPayment } from '@/types/rentalPayments'

const RentalPaymentsTable = ({ rentalPayments }: { rentalPayments: TRentalPayment[] }) => {
  const [showPaymentDetailsModal, setShowPaymentDetailsModal] = useState(false)
  const [selectedPaymentId, setSelectedPaymentId] = useState('')

  if (rentalPayments.length === 0) {
    return <NoDataAvailable />
  }

  function onRentalPaymentRowPress(selectedRowId: string) {
    setSelectedPaymentId(selectedRowId)
    setShowPaymentDetailsModal(true)
  }

  const rentalPaymentsTableConfig = getRentalPaymentsTableConfig(onRentalPaymentRowPress)
  const rentalPaymentsData = prepareRentalPaymentsData(rentalPayments)

  function handleDismissPaymentModal() {
    setShowPaymentDetailsModal(false)
  }

  const selectedRentalPaymentDetails = rentalPaymentsData.find(
    each => each.id === selectedPaymentId,
  )

  return (
    <>
      <BasicDataTable tableConfig={rentalPaymentsTableConfig} data={rentalPaymentsData} />

      <PaymentDetailsModal
        visible={showPaymentDetailsModal}
        onDismissModal={handleDismissPaymentModal}
        paymentDetails={selectedRentalPaymentDetails}
      />
    </>
  )
}

export default RentalPaymentsTable
