<template lang="html">
  <div class="income-overview">
    <income-track></income-track>
    <income-track></income-track>
  </div>
</template>

<script>
import IncomeTrack from './IncomeTrack'

export default {
  components: {
    IncomeTrack
  }
}
</script>

<style scoped>
.income-overview {
  display: flex;
}
</style>
