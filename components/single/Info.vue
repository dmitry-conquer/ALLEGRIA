<template>
  <div class="w-full sm:w-80 shrink-0 space-y-8">
    <div>
      <h1 class="text-2xl md:text-3xl font-medium uppercase">{{ product.name }}</h1>
      <p class="mb-2 text-lg font-light">{{ product.category.name }}</p>
      <div class="inline-flex items-end gap-2 font-medium">
        <span
          v-if="product.oldPrice"
          class="text-lg text-gray-300 line-through"
          >{{ product.oldPrice }} <span>ГРН</span></span
        >
        <span class="text-2xl text-secondary">{{ product.newPrice }} <span>ГРН</span></span>
      </div>
    </div>

    <div>
      <span class="mb-2 block">Розмір:</span>
      <div class="flex flex-wrap gap-2">
        <label
          v-for="size in product.sizes"
          :key="size"
          class="cursor-pointer">
          <input
            type="radio"
            name="size"
            class="peer sr-only"
            :value="size" />
          <span
            class="grid h-8 w-8 shrink-0 place-content-center border text-sm uppercase leading-none transition-colors hover:bg-secondary hover:text-white peer-checked:bg-secondary peer-checked:text-white"
            >{{ size }}</span
          >
        </label>
      </div>
      <SingleSizesTable />
    </div>

    <div>
      <div class="mb-4">
        <SingleButtonToCart :product="product" />
        <SingleButtonBuy :product="product" />
    
      </div>
      <div class="mb-4 flex justify-between gap-4 text-base">
        <SinglePayment button-text="Оплата та доставка" />
        <SingleReturn button-text="Повернення та обмін" />
      </div>

      <div>
        <h2 class="mb-2 uppercase">ІНФОРМАЦІЯ ПРО ТОВАР</h2>
        <p class="text-sm text-gray-600">
          {{ product.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
    default: {},
  },
});
</script>
