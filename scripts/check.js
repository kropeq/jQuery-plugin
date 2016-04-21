$(document).ready(function (){

	var send = $("#send");
	var username = $("#username");
	var retyped = $("#retyped");
	var password = $("#password");
	var email = $("#email");
	var code = $("#kod");

	username.textInput({info : "Wprowadź swoją nazwę"});
	password.passInput();
	email.textInput({info : "Wpisz e-mail"});
	code.codeInput();


	// klikniecie buttona aktywuje funkcje
	send.click(function() {
		username.isValidUsername();
		password.isValidPassword();
		email.isValidEmail({labelColor : {color: "green"}});
		code.isValidCode();
		send.isAllValid();
	});
});