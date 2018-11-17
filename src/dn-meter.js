class DNMeter extends HTMLElement {
    static get observedAttributes() {
        return ["min", "current", "max", "theme"];
    }
    
    constructor() {
        super();

        const style = document.createElement('style');
        style.textContent = 
        `* {
            margin: 0;
            border: 0;
            padding: 0;
            box-sizing: border-box;
            transition: 0.2s;
        }
        .wrapper {
            position: relative;
        }
        .track, .bar {
            height: 50px;
        }
        .track {
            border-radius: 10px;
        }
        .bar {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            position: absolute;
            top: 0;
            left: 0;
        }
        .cool .track {
            background-color: #44484C;
        }
        .cool .track:hover {
            background-color: #505559;
        }
        .cool .bar {
            background-color: #17c3e5;
        }
        .cool .bar:hover {
            background-color: #00ffff;
        }
        .warm .track {
            background-color: #4c4744;
        }
        .warm .track:hover {
            background-color: #595350;
        }
        .warm .bar {
            background-color: #ffaa00;
        }
        .warm .bar:hover {
            background-color: #ffea00;
        }`

        const shadow = this.attachShadow({mode: "open"});
        const wrapper = document.createElement("div");
        const track = document.createElement("div");
        const bar = document.createElement("div");

        wrapper.setAttribute("class", "wrapper");
        track.setAttribute("class", "track");
        bar.setAttribute("class", "bar");

        wrapper.appendChild(track);
        wrapper.appendChild(bar);

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }

    connectedCallback() {
        console.log("<dn-meter> element added to page.");
        this.updateView();
    }

    disconnectedCallback() {
        console.log("<dn-meter> element removed from page.");
    }

    adoptedCallback() {
        console.log("<dn-meter> element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("<dn-meter> element attributes changed.");
        this.updateView();
    }

    updateView() {
        const shadow = this.shadowRoot;
        const themeClass = this.getAttribute("theme") || "cool";
        const current = parseInt(this.getAttribute("current")) || 50;
        const max = parseInt(this.getAttribute("max")) || 100;
        const width = parseInt(shadow.querySelector(".wrapper").clientWidth);

        shadow.querySelector(".wrapper").setAttribute("class", `wrapper ${themeClass}`);

        shadow.querySelector(".bar").style.width = `${(current / max) * width}px`;
    }
}

window.customElements.define("dn-meter", DNMeter);
