import { capitalize } from '@/utils/stringUtils'
import { getDateFromISOString } from '@/utils/dateUtils'

import {
  RENTAL_PAYMENT_STATUS,
  TRentalPayment,
  TTransformedRentalPayment,
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
): TTransformedRentalPayment[] {
  return rentalPayments.map(eachPayment => {
    const { status, paymentDate } = eachPayment

    const paymentStatusLabel = capitalize(status)
    const pillType = getStatusPillType(status)

    const paymentDateOnly = getDateFromISOString(paymentDate)

    return {
      ...eachPayment,
      paymentDate: paymentDateOnly,
      paymentDateFull: paymentDate,
      statusLabel: paymentStatusLabel,
      pillType,
    }
  })
}
