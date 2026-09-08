import { HOURS, PRICING } from '../data/pricing'

export function calculatePath(includeCamp: boolean, includeValidation: boolean) {
  return {
    price: PRICING.research + (includeCamp ? PRICING.camp : 0) + (includeValidation ? PRICING.validation : 0),
    hoursMin: HOURS.research + (includeCamp ? HOURS.camp : 0) + (includeValidation ? HOURS.validationMin : 0),
    hoursMax: HOURS.research + (includeCamp ? HOURS.camp : 0) + (includeValidation ? HOURS.validationMax : 0),
  }
}

export const formatCurrency = (amount: number) => `¥${amount.toLocaleString('zh-CN')}`
