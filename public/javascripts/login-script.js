function check(event) {
	// Get Values
	var username  = document.getElementById('username' ).value;
	var password   = document.getElementById('password').value;

	// Simple Check
	if(username.length < 4) {
		alert("Invalid username");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	if(password.length < 6) {
		alert("Invalid password");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
}
