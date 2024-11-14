<template>
  <div class="relative inline-block text-left w-64 border border-gray-300 dark:border-gray-500 bg-gray-200 rounded dark:bg-[#20293A]"
       :class="{'': !isOpened, 'outline-none ring-2 ring-yellow-600 border-transparent': isOpened}"
  >
    <button
        class="w-full bg-gray-50 text-gray-700 py-2 px-3 rounded flex dark:bg-[#20293A] dark:text-gray-400"
        @click="isOpened = !isOpened"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="my-auto pr-1 size-6" v-if="selectedOption.length ? selectedOption.endsWith('Asc') : defaultSort === 'asc'">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="my-auto pr-1 size-6" v-if="selectedOption.length ? selectedOption.endsWith('Desc') : defaultSort === 'desc'">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
      <span>{{options[(selectedOption.length ? selectedOption : defaultOption)]}}</span>
    </button>

    <div
        class="transition ease-out duration-300 absolute z-50 mt-2 w-full rounded-md shadow-lg bg-white border border-gray-200
                dark:bg-[#20293A] dark:border-slate-700"
        v-if="isOpened"
    >
      <div class="py-1 text-gray-700 dark:text-gray-400 text-base" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div class="px-2 py-2 hover:bg-gray-100 dark:hover:bg-[#161d2a] cursor-pointer flex" v-for="option in optionsKeys" :key="option" role="menuitem" @click="changeOption(option)">
          <div class="pr-1" v-if="ascDescMode">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="my-auto size-6" v-if="option.endsWith('Asc')">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="my-auto size-6" v-if="option.endsWith('Desc')">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          {{options[option]}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['optionChanged'],
  props: {
    options: Object,
    defaultOption: String,
    defaultSort: {
      type: String,
      required: false,
      default: undefined
    },
    ascDescMode: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      isOpened: false as boolean,
      selectedOption: '' as string
    }
  },
  methods: {
    changeOption(option: string) {
      this.selectedOption = option
      this.$emit('optionChanged', option)
      this.isOpened = false
    }
  },
  computed: {
    optionsKeys(): Array<string> {
      return Object.keys(this.options)
    }
  }
}
</script>
