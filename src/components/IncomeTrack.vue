<template lang="html">
  <div class="track">
    <div class="basic-info">
      <span>Previous</span>
      <input type="text" :value="previousIncome" @input="previousIncome = parseFloat($event.target.value)">
      <span>Monthly</span>
      <input type="text" :value="monthlyIncome" @input="monthlyIncome = parseFloat($event.target.value)">
    </div>
    <div class="basic-info">
      <span>Total</span>
      <span class="total">{{ months.reduce((total, month) => total + month.income + month.bonus, 0).toFixed(2) }}</span>
    </div>
    <month-row v-for="(month, i) in months" v-model="months[i]" :previous-income="previousIncome" :monthly-income="monthlyIncome" :index="i"></month-row>
  </div>
</template>

<script>
import MonthRow from './MonthRow'

export default {
  data () {
    return {
      previousIncome: 34567,
      monthlyIncome: 1234.56,
      months: new Array(36).fill(null).map(() => ({
        mode: 'nothing',
        workHours: 0,
        income: 0,
        bonus: 0
      }))
    }
  },
  components: {
    MonthRow
  }
}
</script>

<style scoped>
.track {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.basic-info {
  display: flex;
  margin-bottom: 15px;
}

.total {
  margin-left: 10px;
}

input {
  margin: 0 10px;
}
</style>
