function doCombobox() {
	$('.combobox select').change(function(event) {
		var val = $(this).val();
		if (val == "NONE" || val == null || val == undefined || val == "undefined") {
			$(this).parent().find('.inner .value .holder').removeClass('valid_data');
		} else {
			$(this).parent().find('.inner .value .holder').addClass('valid_data');
		}
		var label = $(this).find(':selected').text();
		$(this).parent().find('.inner .value .holder').text(label);
	})
}