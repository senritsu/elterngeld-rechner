export const base = (totalIncome) => {
  const averageIncome = totalIncome / 12
  return 0.65 * averageIncome
}

export const regular = (totalIncome, income) => {
  const averageIncome = totalIncome / 12
  return Math.max(300, 0.65 * (averageIncome - income))
}

export const plus = (totalIncome, income) => {
  return Math.max(150, Math.min(regular(totalIncome, income), base(totalIncome) / 2))
}
