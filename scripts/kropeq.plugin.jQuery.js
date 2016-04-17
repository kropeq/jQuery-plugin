(function($) {
	$.fn.info = function(options){

		return this.each(function(){
			var settings = $.extend({
				info : "Wprowadź dane"
			}, options);

			// zapamietujemy wprowadzona wartosc wejsciowa
			var rememberInfo = settings.info;
			// i ustawiamy ja
			$(this).val(settings.info);

			// sluzy do tego, ze gdy z myszki przejdziemy na klawiature
			// i najedziemy na inne pole, to poprzednie pole jesli jest puste
			// to nam sie uzupelni, zeby nie bylo 2 pustych rownoczesnie
			$(this).blur(function(){
				if($(this).val() === ""){
					$(this).val(rememberInfo);
				};
			});

			// po kliknieciu na dane pole, jesli jest wartosc wejsciowa
			// powinno wyczyscic pole
			$(this).click(function(){
				if($(this).val() === rememberInfo){
					$(this).val("");
				};
			});

			// ustawienie mozliwosci poruszania sie po polach strzalkami
			// w gore oraz w dol
			$(this).keyup(function(e){
				// key "down"
				if(e.which == 40){
					if($(this).next('input').length !== 0){
						$(this).next().focus();
						$(this).mouseleave();
						$(this).next().mouseenter();
					}
				// key "up"
				} else if (e.which == 38){
					if($(this).prev('input').length !== 0){
						$(this).prev().focus();
						$(this).mouseleave();
						$(this).prev().mouseenter();
					}
				}
			})
			// po najechaniu myszka na pole, jesli znajduje sie 
			// wartosc wejsciowa - czysci pole
			$(this).mouseenter(function(){
				if($(this).val() === rememberInfo){
					$(this).val("");
					$(this).focus();
				} else {
					$(this).focus();
				}
			});

			// po opuszczeniu myszka pola jesli puste, na nowo uzupelni
			// pole wartoscia domyslna i usunie focus lub tylko usunie focus
			$(this).mouseleave(function(){
				if($(this).val() === ""){
					$(this).val(rememberInfo);
					$(this).blur();
				} else {
					$(this).blur();
				}
			});	
		});
	};

	$.fn.isValidUsername = function(){

	}

	$.fn.isValidPassword = function(){
		
	}

	$.fn.isValidEmail = function(){
		
	}
})(jQuery);