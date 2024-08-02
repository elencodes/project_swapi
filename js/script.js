document.addEventListener("DOMContentLoaded", function (event) {
	//Ищем объекты в HTML документе для дальнейшего взаимодействия.	
	const dropdownList = document.querySelector('.select');
	const inputId = document.querySelector('.id');
	const button = document.querySelector('.button');
	const loading = document.querySelector('.loading');
	const result = document.querySelector('.result');
	const errorResult = document.querySelector('.error');

	function showResult() {
		//Показать индикатор загрузки
		loading.style.display = "block";
		loading.style.fontSize = "1.875rem";
		loading.style.color = "blue";
		result.textContent = "";
		errorResult.textContent = "";
		//Создаём промис - методом fetch отправляем GET-запрос на указанный адрес
		fetch(`https://swapi.py4e.com/api/${dropdownList.value}/${inputId.value}`)
			//Работаем с первым обработчиком then
			.then(response => {
				//Если промис был обработан, преобразовываем данные в формат JSON
				if (response.ok) {
					return response.json();
				} else {
					//Если промис НЕ был обработан, то отклоняем его и выводим код статуса ответа (код ошибки)
					return Promise.reject(`Статус ошибки: ${response.status}`);
				}
			})
			//во втором обработчике then выводим данные на страницу
			.then((data) => {
				loading.style.display = "none";
				if (dropdownList.value == `films`) {
					result.textContent = `Найдено: ${data.title}`;
					errorResult.textContent = "";
					inputId.value = "";
				} else {
					result.textContent = `Найдено: ${data.name}`;
					errorResult.textContent = "";
					inputId.value = "";
				}
			})
			//catch сработает, если запросы then НЕ выполнены успешно (например, отвалился интернет, нет данных на сервере и т.д.)
			.catch((error) => {
				loading.style.display = "none";
				result.textContent = "";
				errorResult.textContent = `Данных не существует. Пожалуйста, укажите другой ID (числовой)`;
				//выводим код статуса ответа (код ошибки)
				console.log(error);
				inputId.value = "";
			})
			.finally(function () { //В любом случае
				loading.style.display = "none";
				console.log('Данные по API были запрошены');
			});
	}
	//Вызываем функцию, чтобы код сработал
	button.style.cursor = "pointer";
	button.addEventListener(`click`, showResult);
})