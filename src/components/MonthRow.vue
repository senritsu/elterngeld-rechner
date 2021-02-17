<template lang="html">
  <div class="month-row">
    <span class="month-label">LM {{ index + 1 }}</span>
    <button class="box nothing" :class="{active: value.mode === 'nothing'}" @click="toggleMode('nothing')"></button>
    <button class="box bonus" :class="{active: value.mode === 'regular'}" @click="toggleMode('regular')">€</button>
    <button class="box bonus" :class="{active: value.mode === 'plus'}" @click="toggleMode('plus')">+</button>
    <span></span>
    <button class="box hours" :class="{active: value.workHours === 0}" @click="toggleHours(0)">0</button>
    <button class="box hours" :class="{active: value.workHours === 10}" @click="toggleHours(10)">10</button>
    <button class="box hours" :class="{active: value.workHours === 20}" @click="toggleHours(20)">20</button>
    <button class="box hours" :class="{active: value.workHours === 25}" @click="toggleHours(25)">25</button>
    <button class="box hours" :class="{active: value.workHours === 30}" @click="toggleHours(30)">30</button>
    <button class="box hours" :class="{active: value.workHours === 40}" @click="toggleHours(40)">40</button>
    <span>{{ value.income.toFixed(2) }}</span>
    <span>+</span>
    <span>{{ value.bonus.toFixed(2) }}</span>
    <span>=</span>
    <span>{{ (value.income + value.bonus).toFixed(2) }}</span>
    <span v-if="value.workHours">({{ ((value.income + value.bonus) / value.workHours / 5 * (20 / 21.74)).toFixed(2) }} €/h)</span>
  </div>
</template>

<script>
import {regular, plus} from '@/assets/calculation'

export default {
  props: ['index', 'previousIncome', 'value', 'monthlyIncome'],
  methods: {
    recalculate (mode, workHours) {
      const income = workHours ? (workHours / 40) * this.monthlyIncome : 0
      let bonus = 0
      switch (mode) {
        case 'regular':
          bonus = regular(this.previousIncome, income)
          break
        case 'plus':
          bonus = plus(this.previousIncome, income)
          break
      }
      return {income, bonus}
    },
    toggleMode (mode) {
      this.$emit('input', {...this.value, mode, ...this.recalculate(mode, this.value.workHours)})
    },
    toggleHours (workHours) {
      this.$emit('input', {...this.value, workHours, ...this.recalculate(this.value.mode, workHours)})
    }
  },
  watch: {
    previousIncome: {
      handler () { this.$emit('input', {...this.value, ...this.recalculate(this.value.mode, this.value.workHours)}) },
      immediate: true
    },
    monthlyIncome: {
      handler () { this.$emit('input', {...this.value, ...this.recalculate(this.value.mode, this.value.workHours)}) },
      immediate: true
    }
  }
}
</script>

<style scoped>
.month-row {
  display: flex;
  padding: 5px;
}

input {
  margin-left: 5px;
  width: 4em;
}

span {
  margin-left: 10px;
  text-align: right;
}

span.month-label {
  width: 3em;
}

.box {
  cursor: pointer;
  margin-left: 5px;
  width: 20px;
  height: 20px;
  border: 1px solid #777;
  background-color: #AAA;
  padding: 0;
  color: white;
}

.box.active.full {
  border-color: rgb(182, 37, 5);
  background-color: rgb(207, 84, 52);
}

.box.active.nothing {
  border-color: rgb(182, 149, 5);
  background-color: rgb(230, 200, 47);
}

.box.active.hours {
  border-color: rgb(33, 139, 226);
  background-color: rgb(62, 138, 187);
}

.box.active.bonus {
  border-color: rgb(25, 142, 54);
  background-color: rgb(37, 171, 62);
}
</style>
