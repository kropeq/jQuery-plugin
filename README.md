##  plugin do jQuery

----
### Cel projektu

Poznanie sposobu pisania rozszerzeń do jQuery. W tym celu stworzyłem formularz z polami do rejestracji sprawdzający poprawność uzupełnianych pól, siły wprowadzanego hasła, a także automatyczne rozpoznawanie i uzupełnianie pola "Miasto" na podstawie wprowadzonego kodu pocztowego.

----
### Źródło wiedzy

https://learn.jquery.com/plugins/basic-plugin-creation/

----
### Wykorzystane narzędzia

* edytor kodu Sublime Text 3
* przeglądarka Mozilla Firefox

### Przykład realizacji

```javascript
(function($) {
  // dozwolona kombinacja tylko malych liter i cyfr 
  // o lacznej dlugosci <3,16>
  $.fn.isValidUsername = function(){
    return this.each(function(){
      var pattern = new RegExp("^[a-z0-9]{3,16}$");
      if(pattern.test($(this).val())){
        if($(this).hasClass("incorrect")){
          $(this).removeClass("incorrect");
        }
      } else {
        if(!$(this).hasClass("incorrect")){
          $(this).addClass("incorrect");
        }
      }
    });
  };
  
  $.fn.isAllValid = function(){
    return this.each(function(){
      var inputs = $('.incorrect');
      if(inputs.length === 0){
        alert("WSZYSTKO OK!");
      } else {
        alert("POPRAW BŁĘDY...");
      }
    });
  };
})(jQuery);
```

### Przykład użycia

```javascript
$(document).ready(function (){
  var send = $("#send");  // button
  var username = $("#username");  // input
  send.click(function() {
    // zaznacza jeśli błąd
    username.isValidUsername();
    // sprawdza czy formularz pozbawiony jest błędów
    send.isAllValid();
  });
});
```

----
### Uruchamianie projektu

* otworzenie pliku index.html w przeglądarce

----
### Efekt końcowy

##### 1. Komunikaty błędów

![alt tag](https://github.com/kropeq/jQuery-plugin/blob/master/screens/komunikaty.png)


##### 2. Komunikat błędnego kodu

![alt tag](https://github.com/kropeq/jQuery-plugin/blob/master/screens/blad_kod_pocztowy.png)


##### 3. Autouzupełnianie miasta na podstawie kodu

![alt tag](https://github.com/kropeq/jQuery-plugin/blob/master/screens/autouzupelnianie_miasta.png)
