// 1.
io.connect('/')
// 2.
io.join('uuid')

//2.1
io.room('uuid').emit()

////////////
io.emit()

// по кнопке торгов конкретного итема открываем комнату. Имя комнаты - уникальный продавец
// Эмит от клиента - на он. продавца - этот он получает универсально, по своему айди.
// а отпинывает результат эмитом по уникальному комбо из товара, айди покупателя.
// Покупателю пишем он на эти уникальные эмиты, внутри которых совершаем действия. 
// все