export default eventHandler(async event => {
   const paymentResult = event.body; // Отримайте дані про результат оплати
 
   // Ось ви можете обробити paymentResult за вашими потребами
   // Наприклад, зберегти ці дані в базу даних або виконати інші дії
 
   // Відправте відповідь на запит від LiqPay (підтвердження отримання результату оплати)
   const response = {
     status: 'success',
     message: 'Результат оплати отримано успішно',
   };
 
   return paymentResult;
 });