const setPageIcon = src => {
	setTimeout(() => {
		try {
			const icon = document.querySelector('img');
			icon.src = src;
			icon.style = 'display: block;';
			clearTimeout();
		} catch (e) {
			setPageIcon(src);
		}
	}, 25);
};

(function () {
	setPageIcon('/assets/icon.jpg');
})();
