import Soundboard from './components/soundboard';

const createButton = ({ id, title, start, end }) => {
	const button = document.createElement('button');

	button.textContent = title;
	button.dataset.id = id;
	button.dataset.start = start;
	button.dataset.end = end;
	button.classList.add('button');

	return button;
};

const boot = async () => {
	const buttonsContainer = document.querySelector('.js-buttons');
	const videoContainer = document.querySelector('.js-video');

	const sounds = await fetch('./data/sounds.json').then(res => res.json());
	const sb = new Soundboard(videoContainer);

	window.onYouTubeIframeAPIReady = () => { sb.youtubeReady() };

	sounds.forEach((sound) => {
		const button = createButton(sound);

		button.addEventListener('click', () => {
			sb.playSound(button.dataset);
		});

		buttonsContainer.appendChild(button);
	});
};


boot();