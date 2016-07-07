$(document).ready(function(){    
	$('.materialboxed').materialbox();
	$('.dropdown-button').dropdown();
	$('.button-collapse').sideNav();

});

// Edit LINKEDIN DATA
var button = { clicked: false }
$(document).ready(function(){
	
	function sendtoDatabase() {
		var linkedinstats = {
			jobtitle: $("#class1").text(), 
			companyname: $("#class2").text(), 
			workfield: $("#class3").text(), 
			location: $("#class4").text(), 
			profileurl: $("#class5").text(), 
			lnkid: $("#class6").text(), 
			ajax: true
		}
		$.get( '/updatelinkedinstats', linkedinstats, function(data) {
		})
	}
	function toggleInput() {
		$('.stats').each(function(){
			if ($(this).find('input').length){
				$(this).text($(this).find('input').val());
			}
			else {
				var t = $(this).text();
				$(this).html($('<input />',{'value' : t}).val(t));
			}
		});
	}
	$("#edit-stats").on('click', function(){
		toggleInput()
		if (button.clicked) {
			// Click SAVE
			button.clicked  = false
			sendtoDatabase()
			$(this).text('edit')
		} else {
			// Click EDIT
			button.clicked = true
			$(this).text('save')
		}
	});
});

// Edit Summary

$(document).ready(function(){
	
	function sendtoDatabase() {
		var linkedinstats = {
			summary: $(".summary").text(), 
			lnkid: $("#class6").text(), 
			ajax: true
		}
		$.get( '/updatesummary', linkedinstats, function(data) {
		})
	}
	function toggleInput() {
		$('.summary').each(function(){
			if ($(this).find('textarea').length){
				$(this).text($(this).find('textarea').val());
			}
			else {
				var t = $(this).text();
				$(this).html($('<textarea />',{'value' : t}).val(t));
			}
		});
	}
	$("#edit-summary").on('click', function(){
		toggleInput()
		if (button.clicked) {
			// Click SAVE
			button.clicked  = false
			sendtoDatabase()
			$(this).text('edit')
		} else {
			// Click EDIT
			button.clicked = true
			$(this).text('save')
		}
	});
});

// Edit job

$(document).ready(function(){
	function sendtoDatabase() {
		var linkedinstats = {
			jobsummary: $("#jobsummary").text(), 
			jobtitle: $("#jobtitle").text(), 
			lnkid: $("#class6").text(), 
			ajax: true
		}
		$.get( '/updatejob', linkedinstats, function(data) {
		})
	}
	function toggleInput() {
		$('.job').each(function(){
			if ($(this).find('textarea').length){
				$(this).text($(this).find('textarea').val());
			}
			else {
				var t = $(this).text();
				$(this).html($('<textarea />',{'value' : t}).val(t));
			}
		});
	}
	$("#edit-job").on('click', function(){
		toggleInput()
		if (button.clicked) {
			// Click SAVE
			button.clicked  = false
			sendtoDatabase()
			$(this).text('edit')
		} else {
			// Click EDIT
			button.clicked = true
			$(this).text('save')
		}
	});
});

// Search button

// $(document).ready(function(){
// 	function searchquery() {
// 		var data = $("#searchblock1").val()
// 		console.log('Searching ' + data)
// 		var search = {
// 			firstname: data, 
// 			ajax: true
// 		}
// 		if (search.firstname) {
// 			$.get( '/searchquery', search, function(data) {
// 			})
// 		}
// 	}
// 	$("#search").on('click', function(event){
// 		event.preventDefault()
// 		searchquery()
// 	});
// });


/// First always make sure the document is loaded
$(document).ready(function () {

	// Here I declare the boolean that is used by setTimeout
	var canFireRequest = true

	/// Whenever a key is entered within the #magic form:
	$('#searchblock1').keyup(function() {

		/// parameters is assigned an object containing the values of keys that are entered
		var parameters = {users: $(this).val(), ajax: true}

		/// as soon as parameters contains values
		if (parameters.users) {
			/// and if canfirerequest is true
			if (canFireRequest) {
				/// (and afterwards emediatly set to false)
				canFireRequest = false
				/// ajax magic is happening
				$.post ('/searchresult', parameters, function (data) {
					console.log(data)
					/// dropdowns empties after text is deleted
					$('#results').empty();
					/// dropdown is filled with data 
					data.forEach(function(person){
						$('#results').append('<option>' + person.firstname + " " + person.lastname + '</option>' + '<option>' + person.lastname + " " + person.firstname + '</option>')
					})
					console.log(data)
				})
			}
			setTimeout(function() {
    			canFireRequest = true
			}, 300);
		}
	})
})










