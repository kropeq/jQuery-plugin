$(document).ready(function (){

	var send = $("#send");
	var username = $("#username");
	var retyped = $("#retyped");
	var password = $("#password");
	var email = $("#email");
	// Do tego potem napisze funkcje pluginu
	username.val("Wpisz nazwę użytkownika");
	password.val("Wpisz hasło")
	retyped.val("Powtórz hasło");
	email.val("Wpisz e-mail");
	username.click(function() {
		if(username.val() == "Wpisz nazwę użytkownika") username.val("");
	});

	username.blur(function() {
		if(username.val() == "") username.val("Wpisz nazwę użytkownika");
	});

	// klikniecie buttona aktywuje funkcje
	send.click(function() {
		alert($(this).find("#username").val()+" "+$(this).find("#password").val());
	});
});