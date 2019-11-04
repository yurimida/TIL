<template>
  <div class ="sorting-form--container">
    <div class="sorting-form--sorting-box-container">

      <!-- Select Box -->
      <select ref="categories">
        <option value="">기준을 선택하세요.</option>
        <option :value="category" v-for="category in categories">{{ category }}</option>
      </select>

      <!-- Button -->
      <span @click="sorting('asc')">
        <i class="fas fa-sort-amount-down-alt"></i>
      </span>
      <span @click="sorting('desc')">
        <i class="fas fa-sort-amount-down"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      categories: ['ALCOHOL', 'BODY', 'SWEETNESS']
    }
  },
  methods: {
    ...mapMutations('wine', ['sortingWineList']),

    sorting(order) {
      let key = this.$refs.categories.value;
      if (!key) {
        alert("정렬 기준을 선택해주세요.")
      } else if (key === 'BODY' || key === 'SWEETNESS') {
        key = 'tasting_' + key.toLowerCase();
      } else {}

      const params = {
        key,
        order
      }

      this.sortingWineList(params);
    }
  }
}
</script>

<style scoped>
.sorting-form--container {
  height: 40px;
  margin: 1% 5% 1% 2%;
}

.sorting-form--sorting-box-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
}

.sorting-form--sorting-box-container select {
  height: 30px;
  min-width: 150px;
  margin-right: 10px;
  padding-left: 5px;
  border-width: 1px 1px 1px 1px;
  border-color:#827265;
  border-style: solid;
}

.sorting-form--sorting-box-container span {
  margin-right: 10px;
  line-height: 40px;
  font-size: 25px;
  cursor: pointer;
  transition: 0.5s;
}

.sorting-form--sorting-box-container span:hover {
  color: #1867C0;
}
</style>