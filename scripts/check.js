$(document).ready(function (){

	var send = $("#send");
	var username = $("#username");
	var retyped = $("#retyped");
	var password = $("#password");
	var email = $("#email");

	username.textInput({info : "Wprowadź username"});
	password.passInput();
	email.textInput({info : "Wpisz e-mail"});

	// klikniecie buttona aktywuje funkcje
	send.click(function() {
		username.isValidUsername();
		password.isValidPassword();
		email.isValidEmail({labelColor : {color: "green"}});
	});
});