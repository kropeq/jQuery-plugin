(function($) {
	$.fn.textInput = function(options){

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
					} else if ($(this).next().next('input').length !== 0){
						$(this).mouseleave();
						$(this).next().next().focus();
						$(this).next().next().mouseenter();
					}
				// key "up"
				} else if (e.which == 38){
					if($(this).prev('input').length !== 0){
						$(this).mouseleave();
						$(this).prev().focus();
						$(this).prev().mouseenter();
					} else if ($(this).prev().prev('input').length !== 0){
						$(this).mouseleave();
						$(this).prev().prev().focus();
						$(this).prev().prev().mouseenter();
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

	// sluzy tylko do input na Password
	$.fn.passInput = function(options){
		return this.each(function(){
			var settings = $.extend({
				bar : true
			}, options);

			// ustawienie mozliwosci poruszania sie po polach strzalkami
			// w gore oraz w dol
			$(this).keyup(function(e){
				// key "down"
				if(e.which == 40){
					if($(this).next('input').length !== 0){
						$(this).mouseleave();
						$(this).next().focus();
						$(this).next().mouseenter();
					} else if ($(this).next().next('input').length !== 0){
						$(this).mouseleave();
						$(this).next().next().focus();
						$(this).next().next().mouseenter();
					}
				// key "up"
				} else if (e.which == 38){
					if($(this).prev('input').length !== 0){
						$(this).mouseleave();
						$(this).prev().focus();
						$(this).prev().mouseenter();
					} else if ($(this).prev().prev('input').length !== 0){
						$(this).mouseleave();
						$(this).prev().prev().focus();
						$(this).prev().prev().mouseenter();
					}
				}
			})
			// po najechaniu myszka na pole ustawia focus
			$(this).mouseenter(function(){
					$(this).focus();
			});

			// po opuszczeniu myszka pola jesli puste, usunie bledna validacje
			// i usunie focus lub tylko usunie focus
			$(this).mouseleave(function(){
				if($(this).val() === ""){
					$(this).blur();
					if($(this).hasClass("incorrect")) $(this).removeClass("incorrect");
				} else {
					$(this).blur();
				}
			});	
			if(settings.bar===true){
			// STRENGTH BAR
			$('<div id="passwordStrength"><div id="barStrength"></div></div>').insertBefore($(this));
			$('#passwordStrength').css({position: "relative", margin: "0 auto", width: "80%", height: "20px", "background-color": "grey", "text-align": "center", "border-radius" : "5px"});
			$('#barStrength').css({position: "absolute", width: "0%", height: "100%", "background-color": "green", "font-weight": "bold", color: "white","border-radius" : "5px"});
			
			// wyliczanie mocy hasla
			// i prezentacja na strength bar
			var result;
			$(this).bind('keyup mouseout',function(){
				if($(this).val()!= null){
					var numbers = $(this).val().match(/[0-9]/g);
					if(numbers === null ) numbers = 0;
					else numbers = $(this).val().match(/[0-9]/g).length;

					var letters = $(this).val().match(/[a-z]/g);
					if(letters === null ) letters = 0;
					else letters = $(this).val().match(/[a-z]/g).length;

					var capitals = $(this).val().match(/[A-Z]/g);
					if(capitals === null ) capitals = 0;
					else capitals = $(this).val().match(/[A-Z]/g).length;
					var len = $(this).val().length;
					if(numbers>2) numbers=2;
					if(letters>2) letters=2;
					if(capitals>2) capitals=2;
					if(len>8) len=8;
					result = ((numbers+letters+capitals+len/4)/8)*100;
					// ustawienie koloru i wartosci strength bar
					if(result >= 50 && result <= 80){
						$('#barStrength').css({width: ""+result+"%", "background-color" : "orange"});
						//document.getElementById('barStrength').innerHTML = Math.round(result)+"%";
						document.getElementById('barStrength').innerHTML = "średnie";
					} else if ( result < 30 ){
						$('#barStrength').css({width: ""+result+"%", "background-color" : "red"});
						document.getElementById('barStrength').innerHTML = "złe";
					} else if ( result >= 30 && result < 50){
						$('#barStrength').css({width: ""+result+"%", "background-color" : "red"});
						document.getElementById('barStrength').innerHTML = "słabe"; 
					} else if ( result > 80 && result < 90){
						$('#barStrength').css({width: ""+result+"%", "background-color" : "lightgreen"});
						document.getElementById('barStrength').innerHTML = "dobre";
					} else if ( result >= 90){
						$('#barStrength').css({width: ""+result+"%", "background-color" : "green"});
						document.getElementById('barStrength').innerHTML = "świetne!";
					}
					if(result === 0){
						document.getElementById('barStrength').innerHTML = "";
					}
				}

			})
		}
		});
	}

	// mozliwosc ustawienia wlasnego regexu hasla
	// a jesli brak, to jest domyslny regex
	$.fn.isValidPassword = function(options){
		return this.each(function(){
			var settings = $.extend({
				regex : "^[A-Za-z0-9]{8,20}"
			}, options);
			var pattern = new RegExp(settings.regex);
			// zrobienie regex bez regexu



			// --------------------------
			if(pattern.test($(this).val())){
				// sprawdzanie czy zawiera cyfre, mala i duza litere
				if($(this).val().match(/[0-9]/g) !== null 
				&& $(this).val().match(/[a-z]/g) !== null
				&& $(this).val().match(/[A-Z]/g) !== null){
					if($(this).hasClass("incorrect")) $(this).removeClass("incorrect");
				} else {
					if(!$(this).hasClass("incorrect"))	$(this).addClass("incorrect");
				}			
			} else {
				if(!$(this).hasClass("incorrect")){
					$(this).addClass("incorrect");
				}
			}
		});
	}

	$.fn.isValidEmail = function(options){
		return this.each(function(){
			var settings = $.extend({
				regex : "^(\w|\.|\-){2,}@[a-z0-9]{2,}\.[a-z]{2,3}$",
				labelStyle : {display:"block",width:"200px",height: "10px",margin:"5px auto", },
				labelColor : {color: "red"},
				className : "emailInfo",
				info : "Niepoprawnie wpisany email!"
			}, options);

			var pattern = new RegExp(settings.regex);
			if(pattern.test($(this).val())){
				if($(this).hasClass('incorrect')){
					$(this).removeClass('incorrect');
				}
			// jesli nie zgadza sie email
			// wyswietlenie informacji powyzej przez 2,5s
			// w postaci labelki z trescia bledu
			} else {
				// zabezpieczenie przed powielaniem dodawania labelki
				if(!$(this).prev().hasClass(settings.className)){
					$('<label class="'+settings.className+'">'+settings.info+'</label>').insertBefore($(this)).css(settings.labelStyle).css(settings.labelColor);
					window.setTimeout(function(){
						$('.'+settings.className).remove();
					}, 2500);
				}
				if(!$(this).hasClass('incorrect'))
					$(this).addClass('incorrect');
			}
		});
	}
})(jQuery);