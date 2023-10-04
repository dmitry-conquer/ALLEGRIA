<template>
  <label>
    <p class="mb-2 text-sm">{{ label }}</p>
    <input
      v-if="fieldType === 'input'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      class="w-full rounded-md border p-3 transition-colors focus:border-admin-primary focus:outline-none"
      :placeholder="placeholder" />
    <textarea
      v-else
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="h-32 w-full resize-none rounded-md border p-3 transition-colors focus:border-admin-primary focus:outline-none">
    </textarea>
  </label>
</template>

<script setup>
defineProps({
  fieldType: {
    type: String,
    required: false,
    default: "input",
    validator: value => typeof value === "string",
  },
  label: {
    type: [String, Number],
    required: true,
    validator: value => value.length > 0,
  },
  placeholder: {
    type: [String, Number],
    required: true,
    validator: value => value.length > 0,
  },
  modelValue: {
    type: [String, Number],
    required: true,
    validator: value => value.toString().length > 0,
  },
});
defineEmits({
  "update:modelValue": value => (typeof value === "string" || typeof value === "number") && value.toString().length > 0,
});
</script>
