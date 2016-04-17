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
						$(this).mouseleave();
						$(this).next().focus();
						$(this).next().mouseenter();
					}
				// key "up"
				} else if (e.which == 38){
					if($(this).prev('input').length !== 0){
						$(this).mouseleave();
						$(this).prev().focus();
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
					if($(this).hasClass("incorrect")){
						$(this).removeClass("incorrect");
					};
				} else {
					$(this).blur();
				}
			});	
		});
	};

	// z gory ustalone regex username
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
		
	}

	// mozliwosc ustawienia wlasnego regexu hasla
	// a jesli brak, to jest domyslny regex
	$.fn.isValidPassword = function(options){
		return this.each(function(){
			var settings = $.extend({
				regex : "^[A-Za-z0-9]{8,20}$"
			}, options);
			var pattern = new RegExp(settings.regex);
			if(pattern.test($(this).val())){
				if($(this).val().match(/[0-9]/g) !== null 
					&& $(this).val().match(/[a-z]/g) !== null
					&& $(this).val().match(/[A-Z]/g) !== null){
					if($(this).hasClass("incorrect")){
						$(this).removeClass("incorrect");
					}
				} else {
					if(!$(this).hasClass("incorrect")){
						$(this).addClass("incorrect");
					}
				}			
			} else {
				if(!$(this).hasClass("incorrect")){
					$(this).addClass("incorrect");
				}
			}
		});
	}

	$.fn.isValidEmail = function(){
		
	}
})(jQuery);