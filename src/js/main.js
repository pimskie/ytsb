import sounds from './sounds.json';
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

const boot = () => {
	const buttonsContainer = document.querySelector('.js-buttons');
	const videoContainer = document.querySelector('.js-video');

	const sb = new Soundboard(videoContainer);

	window.onYouTubeIframeAPIReady = () => {
		sounds.forEach((sound) => {
			const button = createButton(sound);

			button.addEventListener('click', () => {
				sb.playSound(button.dataset);
			});

			buttonsContainer.appendChild(button);
		});

		sb.youtubeReady();
	};
};


boot();