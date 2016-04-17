$(document).ready(function (){

	var send = $("#send");
	var username = $("#username");
	var retyped = $("#retyped");
	var password = $("#password");
	var email = $("#email");

	username.info({info : "Wprowadź username"});
	password.info({info : "Wprowadź hasło"});
	retyped.info({info : "Powtórz hasło"});
	email.info({info : "Wpisz e-mail"});

	// klikniecie buttona aktywuje funkcje
	send.click(function() {
		username.isValidUsername();
		password.isValidUsername();
	});
});