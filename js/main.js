
/* ======================================================================
  Global variables
======================================================================== */
// Get window object
var $windowObj = $(window);

// Normal screen / desktop
var desktopScreen = 992;

/* ======================================================================
  Subscribe Form
======================================================================== */
$(function() {

	if ($('#subscribe-data').length) {

		$('.categories').attr('checked',false);

		// Checked fallback for IE8
		$('label.check').click(function(event) {

			if ($(this).hasClass('checked')) {
				$(this).removeClass('checked');
			}
			else {
				$(this).addClass('checked');
			}

		});

	    function validaFechaDDMMAAAA(fecha){
	        var dtCh= "/";
	        var minYear=1899;
	        var maxYear=2016;
	        function isInteger(s){
	            var i;
	            for (i = 0; i < s.length; i++){
	                var c = s.charAt(i);
	                if (((c < "0") || (c > "9"))) return false;
	            }
	            return true;
	        }
	        function stripCharsInBag(s, bag){
	            var i;
	            var returnString = "";
	            for (i = 0; i < s.length; i++){
	                var c = s.charAt(i);
	                if (bag.indexOf(c) == -1) returnString += c;
	            }
	            return returnString;
	        }
	        function daysInFebruary (year){
	            return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
	        }
	        function DaysArray(n) {
	            for (var i = 1; i <= n; i++) {
	                this[i] = 31
	                if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
	                if (i==2) {this[i] = 29}
	            }
	            return this
	        }
	        function isDate(dtStr){
	            var daysInMonth = DaysArray(12)
	            var pos1=dtStr.indexOf(dtCh)
	            var pos2=dtStr.indexOf(dtCh,pos1+1)
	            var strDay=dtStr.substring(0,pos1)
	            var strMonth=dtStr.substring(pos1+1,pos2)
	            var strYear=dtStr.substring(pos2+1)
	            strYr=strYear
	            if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	            if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	            for (var i = 1; i <= 3; i++) {
	                if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	            }
	            month=parseInt(strMonth)
	            day=parseInt(strDay)
	            year=parseInt(strYr)
	            if (pos1==-1 || pos2==-1){
	                return false
	            }
	            if (strMonth.length<1 || month<1 || month>12){
	                return false
	            }
	            if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
	                return false
	            }
	            if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
	                return false
	            }
	            if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
	                return false
	            }
	            return true
	        }
	        if(isDate(fecha)){
	            return true;
	        }else{
	            return false;
	        }
	    }		

		$.validator.addMethod('dateFormat', function (value, element) {
		    return this.optional(element) || validaFechaDDMMAAAA(value);
		    return false;
		}, 'La fecha de nacimiento debe ser \"dd/mm/aaaa\" y ser válida');		

		$('#subscribe-data').validate({
			ignore: false,
			groups: {
			    categories: 'CAT_1 CAT_2 CAT_3 CAT_4 CAT_5 CAT_6 CAT_7 CAT_8'
			},			
			rules: {
				NOMBRE: {
				  required: true,
				  minlength: 2
				},				
				EMAIL: {
				  required: true,
				  email: true
				},
                FECHA: {
                    required: true,
                    dateFormat: true
                },				
				PAIS: {
				  required: true,
				  minlength: 2
				},
				PIEL: {
					required: true
				},	
				CAT_1: {
		            require_from_group: [1, '.categories']
				},
				CAT_2: {
		            require_from_group: [1, '.categories']
				},
				CAT_3: {
		            require_from_group: [1, '.categories']
				},
				CAT_4: {
		            require_from_group: [1, '.categories']
				},
				CAT_5: {
		            require_from_group: [1, '.categories']
				},
				CAT_6: {
		            require_from_group: [1, '.categories']
				},
				CAT_7: {
		            require_from_group: [1, '.categories']
				},
				CAT_8: {
		            require_from_group: [1, '.categories']
				}
			},
			messages: {
				NOMBRE: {
				  required: 'Introduce un nombre',
				  minlength: 'Introduce un nombre válido'
				},
				EMAIL: {
				  required: 'Introduce un e-mail',
				  email: 'Introduce un e-mail válido'
				},
                FECHA: {
                    required: 'Introduce una fecha de nacimiento',
                    dateFormat: 'Introduce una fecha de nacimiento válida'
                },				
				PAIS: {
				  required: 'Introduce un país',
				  minlength: 'Introduce un país válido'
				},
				PIEL: {
				  required: 'Selecciona un tipo de piel'
				},
				CAT_1: {
		            require_from_group: 'Selecciona al menos un producto'
				},
				CAT_2: {
		            require_from_group: 'Selecciona al menos un producto'
				},
				CAT_3: {
		            require_from_group: 'Selecciona al menos un producto'
				},
				CAT_4: {
		            require_from_group: 'Selecciona al menos un producto'
				},
				CAT_5: {
		            require_from_group: 'Selecciona al menos un producto'
				},
				CAT_6: {
		            require_from_group: 'Selecciona al menos un producto'
				},
				CAT_7: {
		            require_from_group: 'Selecciona al menos un producto'
				},
				CAT_8: {
		            require_from_group: 'Selecciona al menos un producto'
				}				
			},
			errorPlacement: function (error, element) {
	            if (element.attr("type") == "checkbox") {
			      error.insertAfter('#check-list-categorias');
			    } else {
			      error.insertAfter(element);
			    }

	        }
		});

	}

});


/* ======================================================================
  Calendar component
======================================================================== */
$(function() {

	if ($('.datepicker').length) {

		datepicker();

	}

});

function datepicker() {

    $('.datepicker').datepicker({
    	container: '.calendar-group',
		templates: {
		    leftArrow: '<i class="icon icon-arrow-left"></i>',
		    rightArrow: '<i class="icon icon-arrow-right"></i>'
		},
        format: 'dd/mm/yyyy',
        language: 'es-ES',
        startView: 2,
        autoclose: true,
        enableOnReadonly: false,
        disableTouchKeyboard: true,
        endDate: '0d'
    });

    $('.datepicker').on('changeDate', function(event) {
        $(event.currentTarget).next('.fecha').val($(event.currentTarget).datepicker('getFormattedDate'));            
        $(event.currentTarget).next('.fecha').valid();
    });

    $('.datepicker').on('show', function(event) {
        $(event.currentTarget).parents('.calendar-group').slideToggle(500);
    });    

}


/* ======================================================================
  Select component
======================================================================== */
$(function() {

	if ($('select.form-control').length) {

		setCustomSelect();

	}

});

function setCustomSelect() {

	var selectBox = $('select.form-control');

	selectBox.css({
		'display': 'none'
	});

	var $optionsList = '<ul class="options-list">';
	var $customSelect = '<div class="custom-select" id="custom-select">';

	selectBox.find('option').each(function(index, option) {

		var optionValue = $(option).attr('value');
		
		if (!optionValue == '') {
			$optionsList += '<li><a class="option" href="#'+ optionValue +'">'+ $(option).text() +'</a></li>';
		}
		else if (optionValue == '') {
			$customSelect += '<div class="form-control with-icon not-selected">'+ $(option).text() +'</div><span class="control-icon"><i class="icon icon-arrow-bottom"></i></span></div>';
		}

	});

	$optionsList += '</ul>';

	selectBox.before($customSelect);
	selectBox.before($optionsList);

	$('.custom-select').find('.control-icon').click(function(event) {
		$(event.currentTarget).parent('.custom-select').next('ul.options-list').slideToggle(500);

		var $arrow = $(event.currentTarget).find('i');
		
		if ($arrow.hasClass('icon-arrow-top')) {
			$arrow.removeClass('icon-arrow-top').addClass('icon-arrow-bottom');
		} else if ($arrow.hasClass('icon-arrow-bottom')) {
			$arrow.removeClass('icon-arrow-bottom').addClass('icon-arrow-top');
		}
	});	

	$('ul.options-list').find('.option').click(function(event) {
		$(event.currentTarget).parents('ul.options-list').prev('.custom-select').find('.form-control').removeClass('not-selected').text($(event.currentTarget).text());
		$(event.currentTarget).parents('ul.options-list').slideToggle(500);
		$(event.currentTarget).parents('ul.options-list').next('select.form-control').val($(event.currentTarget).attr('href').replace('#', ''));
		$(event.currentTarget).parents('ul.options-list').next('select.form-control').valid();
	});

}