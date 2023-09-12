<template>
  <button
    @click="isOpen = true"
    class="mt-2 text-sm underline transition-colors hover:text-secondary"
    type="button">
    Таблиця розмірів
  </button>
  <Transition name="fade">
     <BaseModal
       v-if="isOpen"
       :isOpen="isOpen"
       @close-modal="isOpen = false">
       <div>
         <h3 class="mb-8 text-center text-2xl">Таблиця розмірів</h3>
         <div class="w-full">
           <table class="w-full">
             <thead class="bg-gray-200">
               <tr>
                 <th class="px-3 py-2 font-normal">Параметр</th>
                 <th class="px-3 py-2 font-normal">XS</th>
                 <th class="px-3 py-2 font-normal">S</th>
                 <th class="px-3 py-2 font-normal">M</th>
                 <th class="px-3 py-2 font-normal">L</th>
                 <th class="px-3 py-2 font-normal">XL</th>
               </tr>
             </thead>
             <tbody class="w-full">
               <tr class="odd:bg-white even:bg-slate-50">
                 <td class="px-3 py-2">Розмір</td>
                 <td class="px-3 py-2">40-42</td>
                 <td class="px-3 py-2">42-44</td>
                 <td class="px-3 py-2">44-46</td>
                 <td class="px-3 py-2">46-48</td>
                 <td class="px-3 py-2">48-50</td>
               </tr>
               <tr class="odd:bg-white even:bg-slate-50">
                 <td class="px-3 py-2">Ріст, см</td>
                 <td class="px-3 py-2">160-168</td>
                 <td class="px-3 py-2">165-177</td>
                 <td class="px-3 py-2">167-178</td>
                 <td class="px-3 py-2">168-182</td>
                 <td class="px-3 py-2">170-183</td>
               </tr>
               <tr class="odd:bg-white even:bg-slate-50">
                 <td class="px-3 py-2">Обхват грудей, см</td>
                 <td class="px-3 py-2">80-85</td>
                 <td class="px-3 py-2">83-90</td>
                 <td class="px-3 py-2">85-95</td>
                 <td class="px-3 py-2">95-100</td>
                 <td class="px-3 py-2">100-106</td>
               </tr>
               <tr class="odd:bg-white even:bg-slate-50">
                 <td class="px-3 py-2">Обхват талії, см</td>
                 <td class="px-3 py-2">56-60</td>
                 <td class="px-3 py-2">60-64</td>
                 <td class="px-3 py-2">65-73</td>
                 <td class="px-3 py-2">75-80</td>
                 <td class="px-3 py-2">80-85</td>
               </tr>
               <tr>
                 <td class="px-3 py-2">46-48</td>
                 <td class="px-3 py-2">168-182</td>
                 <td class="px-3 py-2">95-100</td>
                 <td class="px-3 py-2">75-80</td>
                 <td class="px-3 py-2">102-105</td>
                 <td class="px-3 py-2">105-110</td>
               </tr>
               <tr class="odd:bg-white even:bg-slate-50">
                 <td class="px-3 py-2">Обхват стегон, см</td>
                 <td class="px-3 py-2">84-88</td>
                 <td class="px-3 py-2">88-94</td>
                 <td class="px-3 py-2">94-100</td>
                 <td class="px-3 py-2">100-105</td>
                 <td class="px-3 py-2">105-110</td>
               </tr>
             </tbody>
           </table>
         </div>
       </div>
     </BaseModal>
  </Transition>
</template>

<script setup>
const isOpen = ref(false);
</script>

<style lang="scss"></style>
