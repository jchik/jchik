
function checkSubmit() {
	var id = document.forms['addForm']['addID'].value;
	var name = document.forms['addForm']['addName'].value;
	var price = document.forms['addForm']['addPrice'].value;
	var quantity = document.forms['addForm']['addQuantity'].value;
	var message = document.getElementsByClassName('messageBox')[0];
	
	if (id == null || id == "" || name == null || name == "" || price == null || price == "" || quantity == null || quantity == "") {
		message.innerHTML = "All fields must be filled";
		return false;
	}
	
	if (isNaN(id) || isNaN(price) || isNaN(quantity)) {
		message.innerHTML = "ID, Price, and Quantity must be a number";
		return false;
	}
	
	if (id < 0 || id == 0) {
		message.innerHTML = "ID should be greater than 0";
		return false;
	}
	
	if (id.length > 6) {
		message.innerHTML = "ID exceeded the 6 digits limit";
		return false;
	}
	
	if (name.length > 25) {
		message.innerHTML = "Name exceeded character limit";
		return false;
	}
	
	if (price < 0) {
		message.innerHTML = "Price should not be negative";
		return false;
	}	
	
	if (!/^[0-9]+([.][0-9]{1,2})?$/.test(price)) {
		message.innerHTML = "Price must be 0 or a number with up to 2 decimals";
		return false;
	}
	
	if (quantity < 0) {
		message.innerHTML = "Quantity should not be negative";
		return false;
	}
	
	if (!/^[0-9]+$/.test(quantity)) {
		message.innerHTML = "Quantity should be 0 or a positive integer";
		return false;
	}

	if (quantity.length > 5) {
		message.innerHTML = "Quantity exceeded the 5 digits limit";
		return false;
	}	
	
	return true;
}