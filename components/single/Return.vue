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
            <h3 class="mb-2 text-lg font-medium uppercase">Повернення та обмін</h3>
            <p class="text-admin-text mb-3">
              Повернення товарів, придбаних в інтернет-магазині ALLEGRIA, відбувається відповідно до Закону України "Про
              захист прав споживачів". Ви можете повернути товар протягом 14 днів з дня покупки.
            </p>
            <div class="mb-3">
              <h4 class="font-medium">Як оформити заявку на повернення?</h4>
              <p class="text-admin-text">
                Якщо куплена річ Вам не сподобалася або не підійшла - зв'яжіться з нашим контакт центром за телефоном
                +380663169394 і ми допоможемо оформити заявку на повернення.
              </p>
            </div>
            <div>
              <h4 class="font-medium">Які є умови щодо повернення товару?</h4>
              <p class="text-admin-text">
                Обмін і повернення товару здійснюється в тому випадку, якщо зазначений товар не був у вживанні, повністю
                збережено його товарний вигляд - без пошкоджень і слідів носіння, оригінальне паковання, а також бирки,
                пломби, ярлики, фірмові знаки.
              </p>
            </div>
            <p class="text-admin-text">
              Не повертаються і не підлягають обміну купальники, нижня білизна, панчішно-шкарпеткові вироби, предмети
              особистої гігієни, рукавички.
            </p>
            <br/>
            <p class="text-admin-text">
              Ви можете здійснити повернення товару безпосередньо в наших роздрібних магазинах, розташованих у Києві,
              Харкові, Дніпрі та Одесі. Для жителів інших міст України пересилання товару перевізником Новою Поштою або
              будь-яким іншим, на склад інтернет магазину ALLEGRIA, розташованого в місті Харкові, здійснюється за
              рахунок компанії.
            </p>
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
