var indigoguides = [
	{ id: "crabs-seafaring-toad", display: "Crabs / Seafaring Toad" },
	{ id: "fugu-mantas", display: "Fugu / Mantas" },
	{ id: "fugu-stonescale", display: "Fugu / Stonescale" },
	{ id: "hafgufa-amp-elasmosaurus", display: "Hafgufa & Elasmosaurus" },
	{ id: "hafgufa-amp-placodus", display: "Hafgufa & Placodus" },
	{ id: "jellyfish", display: "Jellyfish" },
	{ id: "mantas", display: "Mantas" },
	{ id: "octopus", display: "Octopus" },
	{ id: "seadragons-coral-manta", display: "Seadragons / Coral Manta" },
	{ id: "sharks-coral-manta", display: "Sharks / Coral Manta" },
	{ id: "sothis-amp-elasmosaurus", display: "Sothis & Elasmosaurus" },
	{ id: "sothis-amp-stonescale", display: "Sothis & Stonescale" },
];

var rubyguides = [
	{ id: "glass-dragon-amp-jewel", display: "Glass Dragon & Jewel" },
	{ id: "shellfish-shrimp", display: "Shellfish / Shrimp" },
	{ id: "shellfish-taniwha", display: "Shellfish / Taniwha" },
	{ id: "shrimp-hells-claw", display: "Shrimp / Hells Claw" },
	{ id: "squid-glass-dragon", display: "Squid / Glass Dragon" },
	{ id: "squid-taniwha", display: "Squid / Taniwha" },
];

$(document).ready(function () {
	$(".dropdown-toggle").dropdown();

	for (let key in indigoguides) {
		$("#guide-dropdown").append(
			'<li><button type="button" class="dropdown-item d-flex align-items-center guideSelector" aria-pressed="false" data-guide-id="' +
				indigoguides[key].id +
				'">' +
				indigoguides[key].display +
				'<svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg></button></li>'
		);

		//'<li><button type="button" class="dropdown-item d-flex align-items-center active" aria-pressed="true">'
	}
	$("#guide-dropdown").append('<div class="dropdown-divider"></div>');
	for (let key in rubyguides) {
		$("#guide-dropdown").append(
			'<li><button type="button" class="dropdown-item d-flex align-items-center guideSelector" aria-pressed="false" data-guide-id="' +
				rubyguides[key].id +
				'">' +
				rubyguides[key].display +
				'<svg class="bi ms-auto d-none" width="1em" height="1em"><use href="#check2"></use></svg></button></li>'
		);
	}

	$(".guideSelector").each(function () {
		var $this = $(this);
		$this.on("click", function () {
			$(".guideSelector").removeClass("active");
			$(".guideSelector").attr("aria-pressed", "false");
			$(this).addClass("active");
			$(this).attr("aria-pressed", "true");
			console.log($(this).data("guide-id"));
			window.location.hash = $(this).data("guide-id");
			displayGuideImage($(this).data("guide-id"));
		});
	});

	if (window.location.href.indexOf("#") > -1) {
		var type = window.location.hash.substring(1);
		$('*[data-guide-id="' + type + '"]').addClass("active");
		$('*[data-guide-id="' + type + '"]').attr("aria-pressed", "true");
		displayGuideImage(type);
	} else {
		$("#guide-dropdown li:first button").addClass("active");
		$("#guide-dropdown li:first button").attr("aria-pressed", "true");
		displayGuideImage("crabs-seafaring-toad");
	}
});

function displayGuideImage(type) {
	var images =
		'<img class="fullWidth " src="../img/quickguides/' + type + '.PNG">';

	var link =
		'<br><h2>Seeking more information?</h2><br><h5> <a href="https://guides.ffxivteamcraft.com/guide/ocean-fishing-points#' +
		type +
		'"  target="_blank" rel="noopener noreferrer">Read the in-depth guide</a>.</h5>';

	document.getElementById("guideDisplay").innerHTML = images + link;
}
