<template>
   <!-- eslint-disable vue/v-on-event-hyphenation -->
      <va-select
         v-model="selectedOptions"
         bordered
         autocomplete
         multiple
         highlight-matched-text
         class="col mb-2"
         label="Filter:"
         placeholder="Genre"
         :max-visible-options="3"
         :options="options"
         @update:modelValue="selectOption">
         <template #appendInner>
            <va-icon name="search" />
         </template>
      </va-select>
   <!-- eslint-enable vue/v-on-event-hyphenation -->
</template>
<script>
export default {
   props: {
      /**
       * A list of options of type string to be shown in the select menu.
       */
      options: {
         type: Array,
         default: () => []
      }
   },
   emits: [ 'update-selected-options', 'search' ],
   data: () => ( {
      selectedOptions: [],
      debounceTimeout: null 
   } ),
   methods: {
      selectOption() {
         this.$emit( 'update-selected-options', this.selectedOptions );

         clearTimeout( this.debounceTimeout );
         this.debounceTimeout = setTimeout( () => {
            this.$emit( 'search', this.selectedOptions );
         }, 500 );
      }
   }
}
</script>
<style scoped>
.search-bar-card {
   margin: 1.25em;
   padding: 1.25em 0;
}
.va-select {
   width: 400px;
}
</style>