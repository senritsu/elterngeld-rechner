const projectedIncome = {
  partner1: 0,
  partner2: 0
}

const base = (totalIncome, monthlySideIncome = 0) => {
  const averageIncome = totalIncome / 12
  return 0.65 * (averageIncome - monthlySideIncome)
}

const logAll = sideIncome => {
  Object.keys(projectedIncome).forEach(name => {
    const income = projectedIncome[name]
    const full = base(income)
    const withSideIncome = Math.max(300, base(income, sideIncome))
    const plus = Math.max(150, Math.min(withSideIncome, full / 2))
    const totalRegular = withSideIncome + sideIncome
    const totalPlus = plus + sideIncome
    console.log(`${name}: full ${full.toFixed(2)} => side ${withSideIncome.toFixed(2)} + ${sideIncome.toFixed(2)} = ${totalRegular.toFixed(2)} (${(totalRegular * 12 + sideIncome * 12).toFixed(2)})`)
    console.log(`${name}: full ${full.toFixed(2)} => plus ${plus.toFixed(2)} + ${sideIncome.toFixed(2)} = ${totalPlus.toFixed(2)} (${(totalPlus * 24).toFixed(2)})`)
  })
}

const sideIncomes = [0, 450, 650, 800, 1200, 1800]
for (const sideIncome of sideIncomes) {
  console.log(`Nebenverdienst ${sideIncome}`)
  logAll(sideIncome)
}
