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
				if($(this).val() === "") $(this).val(rememberInfo);
			});

			// po kliknieciu na dane pole, jesli jest wartosc wejsciowa
			// powinno wyczyscic pole
			$(this).click(function(){
				if($(this).val() === rememberInfo) $(this).val("");
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
			});
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
				if($(this).val() === "")
					if($(this).hasClass("incorrect")) 
						$(this).removeClass("incorrect");
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
		
	};

	// sluzy tylko do input na Password
	$.fn.passInput = function(options){
		return this.each(function(){
			var settings = $.extend({
				info : "Wprowadź hasło",
				bar : true
			}, options);
			$(this).attr("placeholder",settings.info);
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
			});
			// po najechaniu myszka na pole ustawia focus
			$(this).mouseenter(function(){
					$(this).focus();
			});

			// po opuszczeniu myszka pola jesli puste, usunie bledna validacje
			$(this).mouseleave(function(){
				if($(this).val() === "")
					if($(this).hasClass("incorrect")) $(this).removeClass("incorrect");
			});	

			if(settings.bar===true){
				// STRENGTH BAR
				$('<div id="passwordStrength"><div id="barStrength"></div></div>').insertBefore($(this));
				$('#passwordStrength').css({position: "relative", margin: "0 auto", width: "80%", height: "20px", "background-color": "grey", "text-align": "center", "border-radius" : "5px"});
				$('#barStrength').css({position: "absolute", width: "0%", height: "100%", "background-color": "green", "font-weight": "bold", color: "white","border-radius" : "5px"});
				
				// wyliczanie mocy hasla
				// i prezentacja na strength bar
				var result;
				$(this).bind('keyup keydown mouseout',function(){
					if($(this).val()!== null){
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
							document.getElementById('barStrength').innerHTML = "niezłe";
						} else if ( result < 30 ){
							$('#barStrength').css({width: ""+result+"%", "background-color" : "red"});
							document.getElementById('barStrength').innerHTML = "słabe";
						} else if ( result >= 30 && result < 50){
							$('#barStrength').css({width: ""+result+"%", "background-color" : "red"});
							document.getElementById('barStrength').innerHTML = "średnie"; 
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

				});
			}
		});
	};

	// mozliwosc ustawienia wlasnego regexu hasla
	// a jesli brak, to jest domyslny regex
	$.fn.isValidPassword = function(options){
		return this.each(function(){
			// zrobienie regex bez regexu
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
			if(len>10) len=10;
			var result = ((numbers+letters+capitals+len/5)/8)*100;
			if(result>=75){
				if($(this).hasClass("incorrect")) $(this).removeClass("incorrect");
			} else {
				// zabezpieczenie przed powielaniem dodawania labelki
				if(!$(this).prev().hasClass("incorrectInfo")){
					$('<label class="incorrectInfo">Zbyt słabe hasło!</label>').insertBefore($(this)).css({display:"block",width:"200px",height: "10px",margin:"5px auto", color: "red"});
					window.setTimeout(function(){
						$('.incorrectInfo').remove();
					}, 2500);
				}
				if(!$(this).hasClass("incorrect"))	$(this).addClass("incorrect");
			}
		});
	};

	$.fn.isValidEmail = function(options){
		return this.each(function(){
			var settings = $.extend({
				regex : "^(\w|\.|\-){2,}@[a-z0-9]{2,}[\.]{1}[a-z]{2,3}$",
				labelStyle : {display:"block",width:"200px",height: "10px",margin:"5px auto"},
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
	};

	$.fn.codeInput = function(options){
		return this.each(function(){
			var settings = $.extend({
				info : "Wpisz kod pocztowy",
				miejscowoscId : "miejscowosc"
			}, options);

			// zapamietujemy wprowadzona wartosc wejsciowa
			var rememberInfo = settings.info;
			// i ustawiamy ja
			$(this).val(settings.info);

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
				} else {
					var codeLength = $(this).val().length;
					if(codeLength>6){
						if(!$(this).hasClass('incorrect'))
							$(this).addClass('incorrect');
					// sprawdzanie poprawnosci wpisanego kodu pocztowego
					// jesli dlugosc ciagu sie zgadza
					} else if (codeLength == 6){
						var count = 0;
						for(var i=0; i<6; i++){
							if(i == 2){
								count += isDash($(this).val().charAt(i));
							} else {
								count += isNumber($(this).val().charAt(i));
							}
						}
						if(count != 6){
							if(!$(this).hasClass('incorrect'))
								$(this).addClass('incorrect');
						} else {
							if($(this).hasClass('incorrect'))
								$(this).removeClass('incorrect');

							// WAŻNE!!!
							// PLIK TXT MUSI BYĆ W TYM FOLDERZE CO HTML
							// INACZEJ ODRZUCI JAKO ODRZUCENIE DOSTĘPU
							// pobiera pod zmienna tekst z pliku .txt
							var allText;
							var rawFile = new XMLHttpRequest();
							rawFile.open("GET", "kody.txt", false);
							rawFile.onreadystatechange = function (){
							    if(rawFile.readyState === 4){
							        if(rawFile.status === 200 || rawFile.status === 0){
							            allText = rawFile.responseText;
							        }
							    }
							};
							rawFile.send(null);

							// dzieli pobrany tekst z pliku na linie
							// potem szuka w linii adresu pocztowego
							// jak znajdzie, to dzieli przez tabulacje
							// i wyciaga 3-ci element z linii  ( miasto )
							var linie = [];
							linie = allText.split(/\r\n|\n/);
							var rozmiar = linie.length;
							var miasto;
							for(var j=0; j<rozmiar; j++){
								if(linie[j].lastIndexOf($(this).val()) != -1){
									miasto = linie[j].split(/\t/);
									$("#"+settings.miejscowoscId).val(miasto[2]);
									break;
								}
								if(j == rozmiar-1){
									$("#"+settings.miejscowoscId).val("Nie rozpoznano!");
									if(!$(this).hasClass('incorrect'))
										$(this).addClass('incorrect');
								}
							}
						}
					} else {

					}
				}
			});

			function isNumber(letter){
				//if(check==="0" || check==="1" || check==="2" || check==="3" || check==="4")
				var numbers = "0123456789";
				if(numbers.lastIndexOf(letter) !== -1){
					return 1;
				} else {
					return 0;
				}
			}

			function isDash(letter){
				var dash = "-";
				if(dash.lastIndexOf(letter) !== -1){
					return 1;
				} else {
					return 0;
				}
			}
			// sluzy do tego, ze gdy z myszki przejdziemy na klawiature
			// i najedziemy na inne pole, to poprzednie pole jesli jest puste
			// to nam sie uzupelni, zeby nie bylo 2 pustych rownoczesnie
			$(this).blur(function(){
				if($(this).val() === "") $(this).val(rememberInfo);
			});

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
				if($(this).val() === "")
					if($(this).hasClass("incorrect")) 
						$(this).removeClass("incorrect");
			});	

		});
	};

	$.fn.isValidCode = function(){
		return this.each(function(){
			if($(this).val().length != 6)
				if(!$(this).hasClass('incorrect'))
					$(this).addClass('incorrect');
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