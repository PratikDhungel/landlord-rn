import { getUserFullName } from '@/utils/stringUtils'

import { TRental, TTransformedRentalData } from '@/types/rentals'
import { getDateFromISOString } from '@/utils/dateUtils'

export function transformRentalData(data: TRental[]): TTransformedRentalData[] {
  return data.map(eachRental => {
    const {
      id,
      userId,
      ownerFirstName,
      ownerLastName,
      ownerEmail,
      tenantId,
      tenantFirstName,
      tenantLastName,
      tenantEmail,
      planId,
      planName,
      planRate,
      startDate: startTimestamp,
    } = eachRental

    const ownerFullName = getUserFullName(ownerFirstName, ownerLastName)
    const tenantFullName = getUserFullName(tenantFirstName, tenantLastName)

    const startDate = getDateFromISOString(startTimestamp)

    return {
      id,
      userId,
      ownerFullName,
      ownerEmail,
      tenantId,
      tenantFullName,
      tenantEmail,
      planId,
      planName,
      planRate,
      startDate,
    }
  })
}
