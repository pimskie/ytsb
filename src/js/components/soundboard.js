export default class Soundboard {
    constructor(el) {
        this.initYoutube();
    }

    initYoutube() {
        this.player = null;
        this.playerState = -1;

        this.loadYoutube();
    }

    loadYoutube() {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';

        const firstScriptTag = document.getElementsByTagName('script')[0];

        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    youtubeReady(a) {
        new YT.Player('player', {
            events: {
                onReady: (e) => { this.onPlayerReady(e); },
                onStateChange: (e) => { this.onPlayerStateChange(e); }
            }
        });
    }

    onPlayerReady(e) {
        this.player = e.target;
    }

    onPlayerStateChange(e) {
        this.playerState = e.data;
    }

    playSound({start = 0, end = 0, id } = {}) {
        if (this.player === null) {
            console.warn('Youtube not ready yet');
        }

        if (this.playerState === 1) {
            console.log('playing.. stop');
            this.player.stopVideo();
        }

        this.player.loadVideoById({
            'videoId': id,
            'startSeconds': start,
            'endSeconds': end,
            'suggestedQuality': 'low'
        });
    }

}