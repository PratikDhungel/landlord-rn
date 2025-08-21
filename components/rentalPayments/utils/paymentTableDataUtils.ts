import { capitalize } from '@/utils/stringUtils'
import { getDateFromISOString } from '@/utils/dateUtils'

import {
  RENTAL_PAYMENT_STATUS,
  TRentalPayment,
  TTransformedRentalPayments,
} from '@/types/rentalPayments'
import { STATUS_PILL_TYPE } from '@/types/common'

function getStatusPillType(status: RENTAL_PAYMENT_STATUS) {
  switch (status) {
    case RENTAL_PAYMENT_STATUS.APPROVED:
      return STATUS_PILL_TYPE.ACTIVE

    case RENTAL_PAYMENT_STATUS.REJECTED:
      return STATUS_PILL_TYPE.DANGER

    default:
      return STATUS_PILL_TYPE.NEUTRAL
  }
}

export function prepareRentalPaymentsData(
  rentalPayments: TRentalPayment[],
): TTransformedRentalPayments[] {
  return rentalPayments.map(eachPayment => {
    const paymentStatusLabel = capitalize(eachPayment.status)
    const pillType = getStatusPillType(eachPayment.status)

    const paymentDate = getDateFromISOString(eachPayment.paymentDate)

    return { ...eachPayment, paymentDate, statusLabel: paymentStatusLabel, pillType }
  })
}
