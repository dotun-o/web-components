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
            border-radius: 5px;
        }
        .bar {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            padding: 10px;
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
            color: #44484C;
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
            color: #4c4744;
        }
        .warm .bar {
            background-color: #ffaa00;
        }
        .warm .bar:hover {
            background-color: #ffea00;
        }
        .stats {
            display: flex;
            justify-content: space-between;
        }`

        const shadow = this.attachShadow({mode: "open"});
        const wrapper = document.createElement("div");
        const track = document.createElement("div");
        const bar = document.createElement("div");
        const stats = document.createElement("div");

        wrapper.setAttribute("class", "wrapper");
        track.setAttribute("class", "track");
        bar.setAttribute("class", "bar");
        stats.setAttribute("class", "stats");

        wrapper.appendChild(track);
        wrapper.appendChild(bar);
        wrapper.appendChild(stats);

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }

    connectedCallback() {
        console.log("<dn-meter> element added to page.");
        this.updateView();
        window.addEventListener("resize", this.updateViewOnWindowResize.bind(this), false);
    }

    disconnectedCallback() {
        console.log("<dn-meter> element removed from page.");
        window.removeEventListener("resize", this.updateViewOnWindowResize.bind(this), false);
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
        const min = parseFloat(this.getAttribute("min")) || 0;
        const current = parseFloat(this.getAttribute("current")) || 50;
        const max = parseFloat(this.getAttribute("max")) || 100;
        const prefix = this.getAttribute("prefix") || "";
        const postfix = this.getAttribute("postfix") || "";
        const width = parseFloat(shadow.querySelector(".wrapper").clientWidth);

        shadow.querySelector(".wrapper").setAttribute("class", `wrapper ${themeClass}`);

        shadow.querySelector(".bar").style.width = `${(current / max) * width}px`;
        shadow.querySelector(".bar").innerHTML = `<span>${prefix}${current}${postfix}</span>`;

        shadow.querySelector(".stats").innerHTML = `<span>${prefix}${min}${postfix}</span><span>${prefix}${max}${postfix}</span>`;
    }

    updateViewOnWindowResize(e) {
        this.updateView();
    }
}

window.customElements.define("dn-meter", DNMeter);
