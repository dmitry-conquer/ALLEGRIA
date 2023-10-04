<template>
  <div>
    <button
      @click="isOpen = true"
      class="text-gray-300 transition-colors hover:text-secondary"
      type="button">
      {{ buttonText }}
    </button>
    <Transition name="fade">
      <BaseModal
        v-if="isOpen"
        :isOpen="isOpen"
        @close-modal="isOpen = false">
        <div class="space-y-6">
          <div>
            <h3 class="font-medium uppercase text-lg mb-2">Оплата</h3>
            <div class="space-y-2">
               <div>
                  <h4 class="font-medium ">Готівкою при отриманні</h4>
                  <p class="text-admin-text">
                    Оплата здійснюється готівкою грошовими коштами кур'єру безпосередньо під час доставки замовлення на адресу
                    одержувача. Вибравши цей спосіб оплати, Ви отримуєте можливість розглянути і приміряти замовлений товар.
                    Якщо якась позиція Вам не підійшла, Ви можете просто повернути її кур'єру, не оплачуючи.
                  </p>
               </div>
               <div>
                  <h4 class="font-medium">Карткою на сайті</h4>
                  <p class="text-admin-text">
                    На сайті нашого інтернет-магазину ми приймаємо оплату платіжними картками Visa і Mastercard. Безпека
                    проведення платежів у нас гарантована системою LiqPay.
                  </p>
               </div>
            </div>
          </div>
          <div>
            <h3 class="font-medium uppercase text-lg mb-2">Доставка</h3>
            <div>
               <h4 class="font-medium">На відділення "Нова Пошта"</h4>
               <p class="text-admin-text">
                 Доставка замовлень клієнтам інтернет-магазину ALLEGRIA здійснюється по території всієї України кур'єрською
                 службою "Нова пошта".
               </p>
            </div>
          </div>
        </div>
      </BaseModal>
    </Transition>
  </div>
</template>

<script setup>
defineProps({
  buttonText: {
    type: String,
    required: true,
    validator: value => typeof value === "string",
  },
});

const isOpen = ref(false);
</script>

<style lang="scss"></style>
