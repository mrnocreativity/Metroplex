function doValidation($target) {
	var result = {};
	var data = {};
	result.success = true;
	result.data = data;

	$target.find('.error').removeClass('error');
	$target.find('input.validate, textarea.validate').each(function(index, item) {
		var $item = $(item);
		var propname = $item.attr('name');
		var value = $item.val();
		value = $.trim(value);
		data[propname] = value;

		if ($item.hasClass('required')) {
			if (value == "") {
				result.success = false;
				$item.addClass('error');
			}
		}

		if ($item.hasClass('repeat_password_1')) {
			var $repeat_password_2 = $target.find('.repeat_password_2');
			repeat_password_2 = $repeat_password_2.val()
			repeat_password_2 = $.trim(repeat_password_2);

			if (value != repeat_password_2 && repeat_password_2 != "") {
				result.success = false;
				$repeat_password_2.addClass('error');
				$item.addClass('error');
			}
		}

		if ($item.hasClass('email')) {
			var email_validator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
			if (!email_validator.test(value)) {
				result.success = false;
				$item.addClass('error');
			}
		}
	})

	return result;
}